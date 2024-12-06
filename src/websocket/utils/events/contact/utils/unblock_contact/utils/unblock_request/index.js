import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleUnblockRequestAction = async (userId, userUsername, contactUsername, contactId) => {
  const client = await pool.connect();

  try {
    const queryUnblockContact = `
      UPDATE contact_list
      SET status = 'accepted', blocked_by = NULL
      WHERE ((user_id = $1 AND contact_id = $2) OR (user_id = $2 AND contact_id = $1)) 
        AND blocked_by = $1
    `;

    const { rowCount } = await client.query(queryUnblockContact, [userId, contactId]);

    if (rowCount !== 1) {
      console.error(`Error: Could not unblock ${contactUsername}.`);
      return {
        success: false,
        message: `Failed to unblock ${contactUsername}.`,
      };
    }

    return {
      success: true,
      messageToUser: `Successfully unblocked ${contactUsername}.`,
      messageToContact: `${userUsername} has unblocked you.`,
    };
  } catch (error) {
    console.error(`Error unblocking ${contactUsername} by user ${userUsername}:`, error);
    return {
      success: false,
      message: `An error occurred while attempting to unblock ${contactUsername}.`,
    };
  } finally {
    client.release();
  }
};
