import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleContactListAction = async (userId) => {
  const client = await pool.connect();


  const contactListQuery = `
  SELECT 
          CASE 
        WHEN user_id = $1 THEN contact_id
        WHEN contact_id = $1 THEN user_id
      END AS related_id,
      u.username,
      u.profile_picture,
      cl.status,
      cl.user_id = $1 AS sent_request,
        CASE
      WHEN cl.blocked_by = $1 THEN true
      ELSE false
    END AS blocker
    FROM contact_list AS cl
    JOIN users as u ON (u.id = cl.user_id OR u.id = cl.contact_id)
    WHERE 
      (cl.user_id = $1 AND u.id != $1) 
      OR 
      (cl.contact_id = $1 AND u.id != $1);
`;

  try {
    const response = await client.query(contactListQuery, [userId]);

    const contactList = response?.rows;


    return {
      success: true,
      message: "Successfully fetched all contacts",
      data: contactList,
    };
  } catch (error) {
    console.error("Error retrieving contact list:", error);
    return { success: false, message: "Failed to fetch contacts" };
  } finally {
    client.release();
  }
};
