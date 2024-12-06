import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleBlockRequestAction = async (userId, userUsername, contactUsername, contactId) => {
  const client = await pool.connect();

  try {
    const queryBlockContact = `
      UPDATE contact_list
      SET status = 'blocked', blocked_by = $1
      WHERE (user_id = $1 AND contact_id = $2) OR (user_id = $2 AND contact_id = $1)
    `;

    const { rowCount } = await client.query(queryBlockContact, [userId, contactId]);

    if (rowCount !== 1) {
      console.error(`Error: Could not block ${contactUsername}.`);
      return {
        success: false,
        message: `Failed to block ${contactUsername}.`,
      };
    }

    return {
      success: true,
      messageToUser: `You have successfully blocked ${contactUsername}.`,
      messageToContact: `${userUsername} has blocked you.`,
    };
  } catch (error) {
    console.error(`Error blocking user ${contactUsername} by ${userUsername}:`, error);
    return {
      success: false,
      message: `An error occurred while attempting to block ${contactUsername}.`,
    };
  } finally {
    client.release();
  }
};
