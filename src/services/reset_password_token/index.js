import crypto from "crypto";

import { handleThrowNewErrorAction } from "../../utils/index.js";

export const handleResetPasswordTokenAction = async (client, email) => {
  // Input validation (simple check to ensure email is provided)
  if (!email) {
    handleThrowNewErrorAction(400,"Email is required")
  }

  const selectUserQuery = `
    SELECT id FROM users
    WHERE email = $1;
  `;
  
  const updateResetPasswordParamsQuery = `
    UPDATE users 
    SET reset_password_token = $1, reset_password_expires = $2 
    WHERE id = $3
  `;

  const resetPasswordToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now

  // Fetch user by email
  const userResult = await client.query(selectUserQuery, [email]);
  const user = userResult.rows[0];
  const userId = user?.id;

  // If user is not found, throw an error
  if (!userId) {
    handleThrowNewErrorAction(404,"User not found")
  }

  const userResetPasswordResponse = await client.query(updateResetPasswordParamsQuery, [
    resetPasswordToken,
    resetPasswordExpires,
    userId,
  ]);

  // If update fails, throw an error
  if (userResetPasswordResponse?.rowCount !== 1) {
    handleThrowNewErrorAction(500,"Error setting reset password token")
  }


  return {
    success: true,
    status: 201,
    message: "Reset password token set successfully",
    data: resetPasswordToken,
  };
};
