import { handleRequestQueryValidationAction } from "../../validators/index.js";
import { handleThrowNewErrorAction } from "../../utils/index.js";
import { handleBroadcastFormDataEventAction } from "../broadcast_form_data_event/index.js";

export const handleDeleteAccountAction = async (client, query, io) => {
  // Validate query inputs
  await handleRequestQueryValidationAction(query);

  const { username } = query;

  // Ensure required fields are provided
  if (!username) handleThrowNewErrorAction(400, "Missing username parameter");

  // Fetch user data based on the provided username
  const userExistsQuery = "SELECT * FROM users WHERE username = $1";
  const userExistsResponse = await client.query(userExistsQuery, [username]);

  const userExists = userExistsResponse?.rows?.length > 0;
  const userId = userExistsResponse?.rows?.[0]?.id;



  if (!userExists) handleThrowNewErrorAction(404, "Account not found");


  // Delete the user account from the database
  const deleteAccountQuery = `DELETE FROM users WHERE username = $1`;
  const deleteAccountResponse = await client.query(deleteAccountQuery, [username]);

  if (deleteAccountResponse?.rowCount !== 1) {
    handleThrowNewErrorAction(500, "An error occurred during account deletion");
  }


  const additionalData = {
    event: "delete_account",
    message: `${username} permanently deleted his account`
  }
  
  await handleBroadcastFormDataEventAction(io, userId, client, additionalData)
   
  // Return a success response
  return {
    status: 200,
    success: true,
    removeUser: true,
    redirect: "/login",
    message: "Your account has been successfully deleted",
  };
};
