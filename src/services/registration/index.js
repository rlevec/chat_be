import { handleRequestBodyValidatationAction } from "../../validators/index.js";
import { handleHashPasswordAction } from "../../utils/index.js";
import { handleSendAccountActivationEmailAction } from "../account_activation_mail/index.js";
import { handleAccountActivationTokenAction } from "../account_activation_token/index.js";

import { handleThrowNewErrorAction } from "../../utils/index.js";

export const handleRegistrationAction = async (client, body) => {
  // Validate request body
  await handleRequestBodyValidatationAction(
    body
  );



  const { email, username, password, confirmPassword, terms } = body;

  // Check if email or username already exists
  const checkUsernameQuery = `SELECT * FROM users WHERE username = $1`;
  const checkEmailQuery = `SELECT * FROM users WHERE email = $1`;

  const isEmailNotUnique = await client.query(checkEmailQuery, [email]);
  const isUsernameNotUnique = await client.query(checkUsernameQuery, [username]);
  const passwordsDoNotMatch = password !== confirmPassword


  if (isEmailNotUnique?.rows?.length) {
    handleThrowNewErrorAction(409, "Email already exists")
  }

  if (isUsernameNotUnique?.rows?.length) {
    handleThrowNewErrorAction(409, "Username already exists")
  }

  if(passwordsDoNotMatch) {
    handleThrowNewErrorAction(400, "Passwords do not match")
  }


  // Hash the password
  const hashedPasswordResponse = await handleHashPasswordAction(password);
  const hashedPassword = hashedPasswordResponse?.data;


  // Insert user into the database
  const insertUserQuery = `INSERT INTO users (email, username, password, terms_status) VALUES($1, $2, $3, $4)`;
  const registerUserResponse = await client.query(insertUserQuery, [
    email,
    username,
    hashedPassword,
    terms,
  ]);

  if (registerUserResponse?.rowCount !== 1) {
    handleThrowNewErrorAction(500, "Error occurred during registration process!")
  }

  // Generate account activation token
  const accountActivationTokenResponse = await handleAccountActivationTokenAction(
    client,
    email
  );



  const activationToken = accountActivationTokenResponse?.data;

  // Send account activation email
  const sendAccountActivationEmailResponse = await handleSendAccountActivationEmailAction(
    email,
    activationToken
  );
  
  return sendAccountActivationEmailResponse
};
