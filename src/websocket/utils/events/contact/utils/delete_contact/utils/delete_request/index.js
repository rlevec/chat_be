import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleDeleteRequestAction = async (userId, userUsername, contactUsername, contactId) => {
  const client = await pool.connect();

  try {
    // Check if users are already contacts (excluding pending requests)
    const contactsExistQuery = `
      SELECT 1 FROM contact_list
      WHERE ((user_id = $1 AND contact_id = $2) OR (user_id = $2 AND contact_id = $1))
        AND status != 'pending'
    `;

    const { rows: existingContacts } = await client.query(contactsExistQuery, [userId, contactId]);

    if (existingContacts.length === 0) {
      return {
        success: false,
        message: `You and ${contactUsername} are not contacts.`,
      };
    }

    // Delete the contact relationship if not blocked
    const deleteContactQuery = `
      DELETE FROM contact_list 
      WHERE ((user_id = $1 AND contact_id = $2) OR (user_id = $2 AND contact_id = $1))
        AND status != 'blocked'
    `;
    const { rowCount } = await client.query(deleteContactQuery, [userId, contactId]);

    if (rowCount !== 1) {
      console.error(`Failed to delete contact with ${contactUsername}.`);
      return {
        success: false,
        messageToUser: `Blocked contacts cannot be deleted.`,
        omitContactBroadcast: true,
      };
    }

    return {
      success: true,
      messageToUser: `Successfully removed ${contactUsername} from your contact list.`,
      messageToContact: `${userUsername} has removed you from their contact list.`,
    };
  } catch (error) {
    console.error(`Error deleting contact for user ${userId} with contact ${contactUsername}:`, error);
    return {
      success: false,
      message: `An error occurred while processing the delete request for ${contactUsername}.`,
    };
  } finally {
    client.release();
  }
};
