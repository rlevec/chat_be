import { handleGetUserByUsernameAction } from "../../../../psql/get_user_by_username/index.js";
import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";
import { handleAddContactAction } from "./utils/add_contact/index.js";

export const handleSendContactRequestAction = async (io, data, userData) => {
  const { contactUsername } = data || {};
  const userId = userData?.id;

  // Check for missing username
  if (!contactUsername) {
    await handleBroadcastToSingleUserAction(
      io,
      userId,
      {
        from: userId,
        message: "Missing username!",
      },
      "error"
    );
    return;
  }

  const {
    data: contactData,
    error: contactError,
    message: responseMessage,
  } = await handleGetUserByUsernameAction(contactUsername);

  // Handle error if contact data retrieval fails
  if (contactError || !contactData) {
    await handleBroadcastToSingleUserAction(
      io,
      userId,
      {
        from: userId,
        message: responseMessage,
      },
      "error"
    );
    return;
  }

  if (userData?.username === contactData?.username) {
    await handleBroadcastToSingleUserAction(
      io,
      userId,
      {
        from: userId,
        message: "You can't send contact request to yourself!",
      },
      "error"
    );
    return;
  }

  const response = await handleAddContactAction(userData, contactData);

  const contactId = contactData?.id;
  const messageToUser = response?.messageToUser || response?.message;
  const messageToContact = response?.messageToContact || response?.message;
  const event = response?.success ? "send_contact_request" : "error";

  // Broadcast messages to users if necessary
  if (response?.broadcast?.includes(userId)) {
    await handleBroadcastToSingleUserAction(
      io,
      userId,
      {
        success: true,
        from: userId,
        message: messageToUser,
      },
      event
    );
  }

  if (response?.broadcast?.includes(contactId)) {
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
};
