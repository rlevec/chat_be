import { handleDeleteRequestAction } from "./utils/delete_request/index.js";

import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";

import { handleGetUserByUsernameAction } from "../../../../psql/get_user_by_username/index.js";

export const handleDeleteContactAction = async (
  io,
  userData,
  contactUsername
) => {
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

  const response = await handleDeleteRequestAction(
    userId,
    userData?.username,
    contactUsername,
    contactId
  );

  const messageToUser = response?.messageToUser || response?.message;
  const messageToContact = response?.messageToContact || response?.message;
  const event = response?.success ? "delete_contact" : "error";
  const omitContactBroadcast = response?.omitContactBroadcast;

  await handleBroadcastToSingleUserAction(
    io,
    userId,
    {
      ...(response?.success ? { success: true } : { error: false }),
      from: userId,
      message: messageToUser,
    },
    event
  );

  if (!omitContactBroadcast) {
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
