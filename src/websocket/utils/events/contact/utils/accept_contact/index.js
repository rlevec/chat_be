import { handleAcceptRequestAction } from "./utils/accept_request/index.js";

import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";

import { handleGetUserByUsernameAction } from "../../../../psql/get_user_by_username/index.js";

export const handleAcceptContactAction = async(io, userData, contactUsername) => {

    const userId = userData?.id;
    if (!userId) {
      console.error("Invalid user data provided");
      return;
    }

    const contact = await handleGetUserByUsernameAction(contactUsername);
    const contactId = contact?.data?.id;

    if (!contactId) {
        return {
            success: false,
            message: `User ${contactUsername} not found.`,
        };
    }

    const response = await handleAcceptRequestAction(userId, userData?.username, contactUsername, contactId)

    const messageToUser = response?.messageToUser || response?.message;
    const messageToContact = response?.messageToContact || response?.message;
    const event = response?.success ? "send_contact_request" : "error";
    

        await handleBroadcastToSingleUserAction(
          io,
          userId,
          {
            ...(response?.success ? { success: true } : {error: false}),
            from: userId,
            message: messageToUser,
          },
          event
        );

        await handleBroadcastToSingleUserAction(
            io,
            contactId,
            {
              success: true,
              from: userId,
              message: messageToContact,
            },
            event
          );
      
    }