import dotenv from 'dotenv';
import RedisStore from 'connect-redis'; // Import the store directly
import redisClient from '../redis/index.js'; // Ensure the path is correct

dotenv.config();

const { 
  SESSION_SECRET,
  NODE_ENV 
} = process.env;

const config = {
  secret: SESSION_SECRET,
  nodeEnv: NODE_ENV,
};

// Initialize the Redis Store with ioredis client
const store = new RedisStore({
  client: redisClient,
  logErrors: true, // Optional: log Redis errors to console
});

export const sessionConfig = {
  store: store,
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Session expires in 1 day
    sameSite: config.nodeEnv === "production" ? "None" : "Lax",
    secure: config.nodeEnv === "production", // Use secure cookies in production
    httpOnly: true,
    path: "/",
  },
};
