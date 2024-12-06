import redisClient from "../../../../config/redis/index.js";


export const handleRemoveDataFromRedisAction = async (redisKey) => {
    try {
        // Attempt to delete the data associated with the redisKey
        const redisDelResponse = await redisClient.del(redisKey);
  
        // Check if the key was deleted
        if (redisDelResponse === 1) {
            console.log(`Successfully removed ${redisKey} from Redis.`);
            return true; // Indicate success
        } else {
            console.log(`No data found for ${redisKey}.`);
            return false; // Indicate that no key was found
        }
    } catch (error) {
        console.error(`Failed to remove ${redisKey} from Redis: ${error.message}`);
        return false; // Indicate failure
    }
  };