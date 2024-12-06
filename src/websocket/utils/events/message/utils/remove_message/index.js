
import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";

import { handleDeleteMessageAction } from "./utils/delete_message/index.js";


export const handleRemoveMessageAction = async (io, data, userData) => {

  const { messageId, senderId, receiverId } = data || {};




     const removeMessageResponse = await handleDeleteMessageAction( 
        messageId
      );

      const { error, success, data: removeMessageResponseData } = removeMessageResponse || {};

      if(error) {

      } else {

        const event = "remove_message"

        const message = {
          success,
          data: removeMessageResponseData
        }
        if (senderId) {
          await handleBroadcastToSingleUserAction(io, senderId, message, event);
        }
        if (receiverId) {
          await handleBroadcastToSingleUserAction(io, receiverId, message, event);
        }
      }
   
   
};
