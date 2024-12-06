import {
  handleRequestQueryValidationAction,
  handleRequestBodyValidatationAction,
} from "../../validators/index.js";
import { handleThrowNewErrorAction } from "../../utils/index.js";
import { handleGetContactListAction } from "../../websocket/utils/events/contact/utils/get_contact_list/index.js";

import { handleBroadcastFormDataEventAction } from "../broadcast_form_data_event/index.js";

export const handleChangeUsernameAction = async (client, query, body, io) => {
  // Validate inputs
  await handleRequestQueryValidationAction(query);
  await handleRequestBodyValidatationAction(body);

  const { username } = query;
  const { newUsername } = body;

  // Ensure required fields are provided
  if (!username) handleThrowNewErrorAction(400, "Missing username parameter");
  if (!newUsername) handleThrowNewErrorAction(400, "New username is required");

  // Retrieve user data based on the current username
  const userDataQuery = "SELECT * FROM users WHERE username = $1";
  const userDataResponse = await client.query(userDataQuery, [username]);
  const userData = userDataResponse?.rows?.[0];

  if (!userData) handleThrowNewErrorAction(404, "User not found");
  const userId = userData.id;

  // Check if the new username already exists
  const usernameExistsResponse = await client.query(userDataQuery, [newUsername]);
  if (usernameExistsResponse?.rows?.length > 0) {
    handleThrowNewErrorAction(403, "Username already exists");
  }

  // Update username in the database
  const updateUsernameQuery = `UPDATE users SET username = $1 WHERE username = $2`;
  const updateUsernameResponse = await client.query(updateUsernameQuery, [newUsername, username]);

  if (updateUsernameResponse?.rowCount !== 1) {
    handleThrowNewErrorAction(500, "An error occurred during the username update");
  }


  const additionalData = {
    event: "change_username",
    message: `${username} updated their username to ${newUsername}`
  }
  
  await handleBroadcastFormDataEventAction(io, userId, client, additionalData)

  // Return success response
  return {
    status: 200,
    success: true,
    removeUser: true,
    redirect: "/login",
    message: "Username successfully updated",
  };
};
