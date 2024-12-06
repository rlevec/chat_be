import { handleGetDataFromRedisAction } from "../redis/index.js";

export const handleBroadcastToSingleUserAction = async(io, targetUserId, message, event) => {
    const { success, data } = await handleGetDataFromRedisAction(`user:${targetUserId}:socketId`);
  
  
    if (success && data) {
    
      io.to(data).emit(event, message); // Send the message to the user's specific socket ID
    } else {
  
    }
  }