import { handleRequestBodyValidatationAction, handleRequestQueryValidationAction } from "../../validators/index.js";

import { handleHashPasswordAction } from "../../utils/index.js";

import { handleThrowNewErrorAction } from "../../utils/index.js";


export const handleResetPasswordAction = async(client, query, body) => {
    // Validate query parameters
    await handleRequestQueryValidationAction(query);

    // Validate request body for 'login' context
    await handleRequestBodyValidatationAction(body);

       const { token } = query;
   
       // Input validation for token
       if (!token) {
         handleThrowNewErrorAction(400, "Missing reset password token parameter");
       }
   
       const { newPassword, confirmNewPassword } = body;
   
       // Input validation for passwords
       if (!newPassword || !confirmNewPassword) {
         handleThrowNewErrorAction(400, "New password and confirmation are required");
       }
   
       if (newPassword !== confirmNewPassword) {
         handleThrowNewErrorAction(400, "New password and confirmation password do not match");
       }
   
       // Fetch user based on the reset token
       const selectUserQuery = `
         SELECT * FROM users 
         WHERE reset_password_token = $1 
         AND reset_password_expires > NOW()
       `;
   
       const selectUserQueryResponse = await client.query(selectUserQuery, [token]);
   
       const user = selectUserQueryResponse?.rows?.[0];
   
       // If no user found or token is expired
       if (!user) {
         handleThrowNewErrorAction(401, "Reset password token is invalid or has expired");
       }
   
       // Hash the new password
       const hashedNewPasswordResponse = await handleHashPasswordAction(newPassword);
       const hashedNewPassword = hashedNewPasswordResponse?.data;
   
       // Update the user's password
       const updatePasswordQuery = `
         UPDATE users 
         SET password = $1, reset_password_token = NULL, reset_password_expires = NULL 
         WHERE id = $2
       `;
   
       const updateUserPasswordResponse = await client.query(updatePasswordQuery, [hashedNewPassword, user?.id]);
   
       if (updateUserPasswordResponse?.rowCount !== 1) {
         handleThrowNewErrorAction(500, "An error occurred during the password reset");
       }
   
       // Return success message
       return {
         status: 200,
         success: true,
         redirect: "/login",
         message: "You have successfully reset your password",
       };

}