import { handleGetUserByUsernameAction } from "../../../../psql/get_user_by_username/index.js";
import { handleSelectConversationAction } from "./utils/select_conversation/index.js";
import { handleCreateConversationAction } from "./utils/create_conversation/index.js";
import { handleCreateMessageAction } from "./utils/create_message/index.js";
import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";

export const handleSendMessageAction = async (io, data, userData) => {


  const { socket_id, id: senderId, username: senderUsername } = userData || {};

  const { receiver: receiverUsername, content: messageContent } = data || {};

  let receiverId = null;
  let conversationId;

  if (receiverUsername) {
    const user = await handleGetUserByUsernameAction(receiverUsername);

    const {
      data: { id },
    } = user || {};

    if (id) receiverId = id;
  }

  if (receiverId && senderId) {
    const conversationSelectResponse = await handleSelectConversationAction(
      senderId,
      receiverId
    );

    const { error, success, data } = conversationSelectResponse || {};

    if (error) {
      const conversationCreateResponse = await handleCreateConversationAction(
        senderId,
        receiverId
      );

      const { id } = conversationCreateResponse || {};



      conversationId = id;
    } else {

      const { id } = data || {};

      conversationId = id;
    }

    if (conversationId) {
   

      const messageResponse = await handleCreateMessageAction(
        conversationId,
        senderId,
        receiverId,
        messageContent
      );
      


      const { error, success, data } = messageResponse || {};

      if(error) {

      } else {

        const event = "new_message"

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
  }
};
