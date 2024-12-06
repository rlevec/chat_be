export const indexes = {
  users: [
    "CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);",
    "CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);",
    "CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);",
  ],
  contact_list: [
    "CREATE INDEX idx_contacts_user_id ON contacts(user_id);",
    "CREATE INDEX idx_contacts_contact_id ON contacts(contact_id);",
    "CREATE INDEX idx_contacts_user_status ON contacts(user_id, status);"
  ],
  messages: [
    "CREATE INDEX idx_messages_sender_receiver ON messages(sender_id, receiver_id);",
    "CREATE INDEX idx_messages_receiver_sender ON messages(receiver_id, sender_id);",
    "CREATE INDEX idx_messages_status ON messages(status);"
  ],
  conversations: [
    "CREATE INDEX idx_conversations_user1_user2 ON conversations(user1_id, user2_id);",
    "CREATE INDEX idx_conversations_user2_user1 ON conversations(user2_id, user1_id);"
  ]
};

