import crypto from "crypto";

import { handleThrowNewErrorAction } from "../../utils/index.js";

export const handleAccountActivationTokenAction = async (client, email) => {
  // Input validation (simple check to ensure email is provided)
  if (!email) {
    handleThrowNewErrorAction(400,"Email is required")
  }

  const selectUserQuery = `
    SELECT id FROM users
    WHERE email = $1;
  `;
  const updateUserActivationParamsQuery = `
    UPDATE users 
    SET activation_token = $1, activation_expires = $2 
    WHERE id = $3
  `;

  const activationToken = crypto.randomBytes(20).toString("hex");
  const activationExpires = new Date(Date.now() + 3600000); // 1 hour from now

  // Fetch user by email
  const userResult = await client.query(selectUserQuery, [email]);
  const user = userResult.rows[0];
  const userId = user?.id;

  // If user is not found, throw an error
  if (!userId) {
    handleThrowNewErrorAction(404,"User not found")
  }

  // Update user activation token and expiration
  const userActivationResponse = await client.query(updateUserActivationParamsQuery, [
    activationToken,
    activationExpires,
    userId,
  ]);

  // If update fails, throw an error
  if (userActivationResponse?.rowCount !== 1) {
    handleThrowNewErrorAction(500,"Error setting activation token")
  }

  // Return activation token on success
  return {
    success: true,
    status: 201,
    message: "Activation token set successfully",
    data: activationToken,
  };
};
