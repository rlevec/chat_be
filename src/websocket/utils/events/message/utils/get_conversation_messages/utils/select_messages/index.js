import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleSelectMessagesAction = async (conversationId) => {
  const client = await pool.connect();

  try {

    const selectMessagesQuery = `
  SELECT
  messages.*,
  (SELECT username FROM users WHERE id = messages.sender_id) AS username,
  (SELECT profile_picture FROM users WHERE id = messages.sender_id) AS profile_picture
  FROM messages
  WHERE conversation_id = $1
  ORDER BY created_at ASC;
  `;
  

    // Pass conversationId as an array
    const selectMessageQueryResponse = await client.query(selectMessagesQuery, [conversationId]);

    // Use rows directly for multiple messages
    const messages = selectMessageQueryResponse?.rows;

    if (messages && messages.length > 0) {
      return {
        success: true,
        data: messages,
      };
    } else {
      return {
        success: false,
        error: true,
        message: "No messages found",
      };
    }
  } catch (error) {
    console.error("Error in handleSelectMessagesAction:", error);
    return {
      success: false,
      error: true,
      message: error.message,
    };
  } finally {
    if (client) client.release();
  }
};
