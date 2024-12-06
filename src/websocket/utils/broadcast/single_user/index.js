import { handleGetDataFromRedisAction } from "../../redis/get_data_from_redis/index.js";

export const handleBroadcastToSingleUserAction = async(io, targetUserId, message, event) => {
    const { success, data } = await handleGetDataFromRedisAction(`user:${targetUserId}:socketId`);
  
  
    if (success && data) {
      console.log("Sending message to socketId:", data);
      io.to(data).emit(event, message); // Send the message to the user's specific socket ID
    } else {
      console.log(`User ${targetUserId} is not connected`);
    }
  }