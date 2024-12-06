import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleSelectConversationAction = async(senderId, receiverId) => {
    const client = await pool.connect();
    
    try {
         

    const selectConversationQuery = `
    SELECT * FROM conversations 
    WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1);
  `;

  const selectConversationQueryResponse = await client.query(selectConversationQuery, [senderId, receiverId]);

  const conversation = selectConversationQueryResponse?.rows?.[0]


     if(conversation) {
        return {
            success: true,
            data: conversation
        }

     } else {
        return {
            error: true,
        }
     }
    }  catch(error) {
        
    }finally{
        client.release();
    }

}