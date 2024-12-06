import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleAddContactAction = async (userData, contactData) => {
  const { id: userId, username: userUsername } = userData;
  const { id: contactId, username: contactUsername } = contactData;
  const client = await pool.connect();

  try {
    // Check if users are already connected in some way
    const checkIfUsersAreContactsQuery = `
      SELECT * FROM contact_list 
      WHERE (user_id = $1 AND contact_id = $2) 
         OR (contact_id = $1 AND user_id = $2)
    `;
    const { rows: existingContacts } = await client.query(checkIfUsersAreContactsQuery, [userId, contactId]);

    // If no connection exists, create a new contact request
    if (existingContacts.length === 0) {
      const addContactQuery = `INSERT INTO contact_list (user_id, contact_id) VALUES ($1, $2)`;
      const { rowCount } = await client.query(addContactQuery, [userId, contactId]);

      if (rowCount === 1) {
        return {
          success: true,
          messageToUser: `You have sent ${contactUsername} a contact request!`,
          messageToContact: `${userUsername} sent you a contact request!`,
          broadcast: [userId, contactId],
        };
      } else {
        return {
          error: true,
          message: "Database error occurred while sending contact request.",
          broadcast: [userId],
        };
      }
    } else {
      const { status, user_id: requestSenderId, blocked_by: blockedBy } = existingContacts[0];
      const isRequestSender = userId === requestSenderId;
      const isBlocker = userId === blockedBy;

      let message;
      switch (status) {
        case "pending":
          message = isRequestSender
            ? `Your contact request to ${contactUsername} is still pending.`
            : `You have not responded to ${contactUsername}'s contact request.`;
          break;
        case "accepted":
          message = `You are already connected with ${contactUsername}.`;
          break;
        case "blocked":
          message = isBlocker
            ? `You have blocked ${contactUsername}.`
            : `You have been blocked by ${contactUsername}.`;
          break;
        default:
          message = "An unknown contact status was encountered. Please contact support.";
          break;
      }

      return {
        success: true,
        message,
        broadcast: [userId],
      };
    }
  } catch (error) {
    console.error("Error handling add contact action:", error);
    return {
      error: true,
      message: "An internal server error occurred. Please try again.",
      broadcast: [userId],
    };
  } finally {
    client.release();
  }
};
