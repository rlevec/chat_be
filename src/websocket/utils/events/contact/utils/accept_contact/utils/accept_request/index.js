import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleAcceptRequestAction = async (userId, userUsername, contactUsername, contactId) => {
  const client = await pool.connect();

  try {
    // Check if the users are already contacts (excluding pending requests)
    const contactExistsQuery = `
      SELECT 1 FROM contact_list
      WHERE ((user_id = $1 AND contact_id = $2) OR (user_id = $2 AND contact_id = $1))
        AND status != 'pending'
    `;
    const { rows: existingContacts } = await client.query(contactExistsQuery, [userId, contactId]);

    if (existingContacts.length > 0) {
      return {
        success: false,
        message: `${contactUsername} is already in your contact list.`,
      };
    }

    // Check if the user has been blocked by the contact
    const isBlockedQuery = `
      SELECT 1 FROM contact_list
      WHERE ((user_id = $1 AND contact_id = $2) OR (user_id = $2 AND contact_id = $1))
        AND blocked_by = $2
        AND status = 'blocked'
    `;
    const { rows: blockedStatus } = await client.query(isBlockedQuery, [userId, contactId]);

    if (blockedStatus.length > 0) {
      return {
        success: false,
        message: `Cannot send a contact request to ${contactUsername}; they have blocked you.`,
      };
    }

    // Accept the contact request
    const acceptContactQuery = `
      UPDATE contact_list 
      SET status = 'accepted' 
      WHERE user_id = $2 AND contact_id = $1
    `;
    const { rowCount } = await client.query(acceptContactQuery, [userId, contactId]);

    if (rowCount !== 1) {
      console.error(`Failed to accept contact request from ${contactUsername} for user ${userUsername}.`);
      return {
        success: false,
        message: `Could not accept ${contactUsername}'s contact request.`,
      };
    }

    return {
      success: true,
      messageToUser: `You have accepted ${contactUsername}'s contact request.`,
      messageToContact: `${userUsername} has accepted your contact request.`,
    };
  } catch (error) {
    console.error(`Error accepting contact request from ${contactUsername} for user ${userId}:`, error);
    return {
      success: false,
      message: `Error occurred while accepting ${contactUsername}'s contact request.`,
    };
  } finally {
    client.release();
  }
};
