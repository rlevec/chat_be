import { handleBroadcastToSingleUserAction } from "./utils/broadcast/index.js";

export const handleBroadcastFormDataEventAction = async (
  io,
  userId,
  client,
  additionalData
) => {
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
  const contactListResponse = await client.query(contactListQuery, [userId]);
  const contactList = contactListResponse?.rows;

  if (contactList?.length > 0) {
    await Promise.all(
      contactList.map(async (contact) => {
        const { related_id: contactId } = contact;
        if (contactId) {
          if (additionalData) {
            const { event, message } = additionalData || {};

         

            handleBroadcastToSingleUserAction(
              io,
              contactId,
              {
                message,
              },
              event
            );
          }
        }
      })
    );
  }
};
