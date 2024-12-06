

import { handleRequestQueryValidationAction } from "../../validators/index.js"

import { handleRequestBodyValidatationAction } from "../../validators/index.js";

import { handleHashPasswordAction } from "../../utils/index.js";

export const handleChangePasswordAction = async(client, query, body) => {

    await handleRequestQueryValidationAction(query);

    await handleRequestBodyValidatationAction(body);

    const { username } = query;
   
       // Input validation for token
       if (!username) {
         handleThrowNewErrorAction(400, "Missing username parameter");
       }

       
   
       const { confirmNewPassword, newPassword } = body;


       if (!confirmNewPassword || !newPassword) {
        handleThrowNewErrorAction(400, "Missing confirmNewPassword or newPassword from request body");
      }

      if(confirmNewPassword !== newPassword) {
        handleThrowNewErrorAction(400, "Passwords do not match");
      }

      const hashedNewPasswordResponse = await handleHashPasswordAction(newPassword);
      const hashedNewPassword = hashedNewPasswordResponse?.data;
    

      const updatePasswordQuery = `UPDATE users SET password = $1 WHERE username = $2`

      const updatePasswordResponse = await client.query(updatePasswordQuery, [hashedNewPassword, username])


      if (updatePasswordResponse?.rowCount !== 1) {
        handleThrowNewErrorAction(500, "An error occurred during the password update");
      }

      return {
        status: 200,
        success: true,
        removeUser: true,
        redirect: "/login",
        message: "You have successfully updated your password",
      };
}