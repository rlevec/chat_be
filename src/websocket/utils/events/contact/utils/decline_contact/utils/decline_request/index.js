import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleDeclineRequestAction = async (
  userId,
  userUsername,
  contactUsername,
  contactId
) => {
  let client;
  try {
    client = await pool.connect();

    const queryDeclineContact = `
      DELETE FROM contact_list 
      WHERE (user_id = $1 AND contact_id = $2) 
         OR (user_id = $2 AND contact_id = $1)
    `;

    const response = await client.query(queryDeclineContact, [userId, contactId]);

    if (response.rowCount !== 1) {
      console.error(
        `Failed to decline ${contactUsername}'s contact request for user ${userUsername}.`
      );
      return {
        success: false,
        message: `Failed to decline ${contactUsername}'s contact request.`,
      };
    }

    return {
      success: true,
      messageToUser: `Successfully declined ${contactUsername}'s contact request.`,
      messageToContact: `${userUsername} declined your contact request.`,
    };
  } catch (error) {
    console.error(
      `Error declining contact request for user ${userId} from ${contactUsername}:`,
      error
    );
    return {
      success: false,
      message: `Failed to decline ${contactUsername}'s contact request due to an error.`,
    };
  } finally {
    if (client) client.release();
  }
};
