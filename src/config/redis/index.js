import Redis from "ioredis";


import dotenv from 'dotenv';




dotenv.config();

const { 
  REDIS_HOST,
  REDIS_PORT
} = process.env;


export const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT ? parseInt(REDIS_PORT, 10) : undefined 
}

const redisClient = new Redis(redisConfig);

export default redisClient