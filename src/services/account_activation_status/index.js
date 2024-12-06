import { handleRequestQueryValidationAction } from "../../validators/index.js";

import { handleThrowNewErrorAction } from "../../utils/index.js";

export const handleAccountActivationStatusAction = async (query, client) => {
  // Validate the request query
 await handleRequestQueryValidationAction(query);


  const { token } = query || {};

  // Input validation
  if (!token) {
    handleThrowNewErrorAction(400, "Missing activation token parameter")
  }

  const selectUserQuery = `
    SELECT * FROM users 
    WHERE activation_token = $1 
    AND activation_expires > NOW()
  `;

  const updateActivationStatusQuery = `
    UPDATE users 
    SET activated = $1, activation_token = NULL, activation_expires = NULL 
    WHERE id = $2
  `;

  // Fetch user based on token
  const selectUserQueryResponse = await client.query(selectUserQuery, [token]);

  const user = selectUserQueryResponse?.rows?.[0];

  // If no user found or token expired
  if (!user) {
    handleThrowNewErrorAction(401, "Account activation token is invalid or has expired!")
  }

  // Update activation status
  const updateActivationStatusResponse = await client.query(updateActivationStatusQuery, [true, user?.id]);

  if (updateActivationStatusResponse?.rowCount !== 1) {
    handleThrowNewErrorAction(500, "An error occurred during account activation!")
  }

  // Return success message
  return {
    status: 200,
    success: true,
    redirect: "/login",
    message: "You have successfully activated your account",
  };
};
