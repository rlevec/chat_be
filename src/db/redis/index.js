import redisClient from "../../config/redis/index.js";



export const handleRedisClientConnectionAction = async () => {
  try {
      // Check if the Redis client is ready
      if (redisClient?.status === "ready") {
          return { success: true, message: "Already connected" };
      } 
      
      // Check if the Redis client is currently connecting
      else if (redisClient?.status === "connecting") {
          return { success: false, message: "Currently connecting" };
      } 
      
      // If the client is not connected or connecting, try to connect
      else {
          await redisClient.connect();

          // Verify connection status after attempting to connect
          if (redisClient?.status === "ready") {
              return { success: true, message: "Connected successfully" };
          } else {
              return { success: false, message: "Connection failed" };
          }
      }
  } catch (error) {
     
      return { success: false, message: error.message || "Unknown error" };
  }
};
