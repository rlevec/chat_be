import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";
import { handleSelectConversationAction } from "./utils/select_conversation/index.js";
import { handleSelectMessagesAction } from "./utils/select_messages/index.js";
import { handleGetUserByUsernameAction } from "../../../../psql/get_user_by_username/index.js";

export const handleGetConversationMessagesAction = async (
  io,
  data,
  userData
) => {
  const { socket_id, id: senderId, username: senderUsername } = userData || {};

  const { receiver: receiverUsername } = data || {};

  let receiverId = null;

  if (receiverUsername) {
    const user = await handleGetUserByUsernameAction(receiverUsername);

    const { data: userDataResponse } = user || {};

    if (userDataResponse?.id) receiverId = userDataResponse.id;
  }

  if (senderId && receiverId) {
    const conversationSelectResponse = await handleSelectConversationAction(
      senderId,
      receiverId
    );

    const {
      error,
      success,
      data: conversationResponseData,
    } = conversationSelectResponse || {};

    const { id: conversationId } = conversationResponseData || {};



    if (conversationId) {
      const messagesSelectResponse = await handleSelectMessagesAction(
        conversationId
      );

   

      const { success, data: messagesSelectResponseData } =
        messagesSelectResponse;
      const event = success ? "get_conversation_messages" : "error";

      const conversationParticipants = [
        {
          id: senderId,
          username: senderUsername,
        },
        {
          id: receiverId,
          username: receiverUsername
        }
      ]

    

      const message = {
        success,
        data: messagesSelectResponseData,
        conversationParticipants
      };
      if (senderId) {
        await handleBroadcastToSingleUserAction(io, senderId, message, event);
      }
      if (receiverId) {
        await handleBroadcastToSingleUserAction(io, receiverId, message, event);
      }
    }
  }
};
