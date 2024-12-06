import { handleResetPasswordTokenAction } from "../reset_password_token/index.js";
import { handleSendForgotPasswordEmailAction } from "../forgot_password_mail/index.js";

import { handleThrowNewErrorAction } from "../../utils/index.js";

import { handleRequestBodyValidatationAction } from "../../validators/index.js";

export const handleForgotPasswordAction = async (client, body) => {
  
  await handleRequestBodyValidatationAction(body);

  const { email } = body;

  const selectUserQuery = `SELECT * FROM users WHERE email = $1`;

  const selectUserResponse = await client.query(selectUserQuery, [email]);

  const user = selectUserResponse?.rows?.[0];

  if (!user) {
    handleThrowNewErrorAction(400, "User not found");
  }

  // Generate account activation token
  const passwordResetTokenResponse = await handleResetPasswordTokenAction(
    client,
    email
  );


  const passwordResetToken = passwordResetTokenResponse?.data;


  // Send account activation email
  const sendAccountActivationEmailResponse =
    await handleSendForgotPasswordEmailAction(email, passwordResetToken);

  return sendAccountActivationEmailResponse;
};
