import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";
import { handleContactListAction } from "./utils/contact_list/index.js";

// Retrieves the contact list for a given user
export const handleGetContactListAction = async (
  io,
  userData
) => {
  // Ensure userId is present in either userData or additionalData
  const userId = userData?.id;

  
  if (!userId) {
    console.error(
      "Invalid user data or additional data provided. Missing user ID."
    );
    return;
  }

  // Fetch the contact list data
  const response = await handleContactListAction(userId);


  const { message, success, data } = response;
  const event = success ? "get_contact_list" : "error";
  
  

  // If successful, broadcast the contact list data
  if (success && data) {
    handleBroadcastToSingleUserAction(
      io,
      userId,
      {
        success,
        data,
        message, // Include message even if success is true (for consistency)
      },
      event
    );
  }

};
