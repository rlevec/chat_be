

export const userModel = `
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) DEFAULT NULL,
    terms_status BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activated BOOLEAN DEFAULT FALSE,
    activation_token VARCHAR(255),
    activation_expires TIMESTAMPTZ,
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMPTZ 
`

export const contactListModel = `
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  contact_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('accepted', 'blocked', 'pending')),
  blocked_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, contact_id)
`;



export const formDataModel = `
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  content JSONB NOT NULL
`


export const conversationModel = `
  id SERIAL PRIMARY KEY,  
  user1_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,  
  user2_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  CONSTRAINT unique_conversation UNIQUE (user1_id, user2_id)
`

export const messageModel = `
  id SERIAL PRIMARY KEY,  
  sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,  
  receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,  
  content TEXT,  
  is_read BOOLEAN DEFAULT FALSE,  
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`