import { handleRequestBodyValidatationAction } from "../../validators/index.js";
import { handleThrowNewErrorAction } from "../../utils/index.js";

import { handleAccountActivationTokenAction } from "../account_activation_token/index.js";
import { handleSendAccountActivationEmailAction } from "../account_activation_mail/index.js";

export const handleResendAccountActivationEmailAction = async (client, body) => {
  // Validate request body
  await handleRequestBodyValidatationAction(body);

  const { email } = body;

  // Check if the user exists
  const selectUserQuery = `SELECT * FROM users WHERE email = $1`;
  const userQueryResponse = await client.query(selectUserQuery, [email]);
   const user = userQueryResponse?.rows?.[0]

  if (!user) {
    handleThrowNewErrorAction(404, "User does not exist"); // Use 404 instead of 400
  }

  // Check if the user is already activated
  if (user?.activated) {
    handleThrowNewErrorAction(409, "User already activated"); // Use 409 Conflict
  }

  // Generate account activation token
  const accountActivationTokenResponse = await handleAccountActivationTokenAction(client, email);


  const activationToken = accountActivationTokenResponse?.data;


  // Send account activation email
  const sendAccountActivationEmailResponse = await handleSendAccountActivationEmailAction(
    email,
    activationToken
  );

  return sendAccountActivationEmailResponse
};
