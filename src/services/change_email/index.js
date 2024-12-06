

import { handleRequestQueryValidationAction } from "../../validators/index.js"

import { handleRequestBodyValidatationAction } from "../../validators/index.js";

import { handleThrowNewErrorAction } from "../../utils/index.js";

export const handleChangeEmailAction = async(client, query, body) => {

    await handleRequestQueryValidationAction(query);

    await handleRequestBodyValidatationAction(body);

    const { username } = query;
   
       // Input validation for token
       if (!username) {
         handleThrowNewErrorAction(400, "Missing username parameter");
       }

       
   
       const { newEmail } = body;


       if (!newEmail) {
        handleThrowNewErrorAction(400, "New email is required");
      }

      const usernameExistsQuery = 'SELECT * FROM users WHERE email = $1'

      const emailExistsResponse = await client.query(usernameExistsQuery, [newEmail])

      const emailExists = !!emailExistsResponse?.rows?.length > 0


      if(emailExists) {
        handleThrowNewErrorAction(403, "Email already exists");
      }


      const updateEmailQuery = `UPDATE users SET email = $1 WHERE username = $2`

      const updateEmailResponse = await client.query(updateEmailQuery, [newEmail, username])


      if (updateEmailResponse?.rowCount !== 1) {
        handleThrowNewErrorAction(500, "An error occurred during the email update");
      }

      return {
        status: 200,
        success: true,
        removeUser: true,
        redirect: "/login",
        message: "You have successfully updated your email",
      };
}