
import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";

import { handleUpdateMessageAction } from "./utils/update_message/index.js";

import { handleGetUserByUsernameAction } from "../../../../psql/get_user_by_username/index.js";

export const handleEditMessageAction = async (io, data, userData) => {
  console.log("userData", userData);

  const { socket_id, id: senderId, username: senderUsername } = userData || {};

  const { receiver: receiverUsername, content: messageContent, messageId } = data || {};

  let receiverId = null;

  console.log("receiverUsername", receiverUsername)

  if (receiverUsername) {
    const user = await handleGetUserByUsernameAction(receiverUsername);

    const {
      data: { id },
    } = user || {};

    if (id) receiverId = id;


    const updateMessageResponse = await handleUpdateMessageAction(
        messageContent, 
        messageId
      );

      console.log("updateMessageResponse", updateMessageResponse)

      const { error, success, data } = updateMessageResponse || {};

      if(error) {

      } else {

        const event = "edit_message"

        const message = {
          success,
          data
        }
        if (senderId) {
          await handleBroadcastToSingleUserAction(io, senderId, message, event);
        }
        if (receiverId) {
          await handleBroadcastToSingleUserAction(io, receiverId, message, event);
        }
      }
  }
   
};
