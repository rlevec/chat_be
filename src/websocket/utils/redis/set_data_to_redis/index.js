import redisClient from "../../../../config/redis/index.js";

export const handleSetDataToRedisAction = async (redisKey, data, expirationTime = null) => {
    const redisData = JSON.stringify(data);
    
    try {
        if (expirationTime) {
            const redisSetResponse = await redisClient.set(redisKey, redisData, 'EX', expirationTime);
            return handleRedisSetResponse(redisKey, redisSetResponse);
        } else {
            const redisSetResponse = await redisClient.set(redisKey, redisData);
            return handleRedisSetResponse(redisKey, redisSetResponse);
        }
    } catch (error) {
        console.error(`Failed to set ${redisKey} data to Redis: ${error.message}`);
    }
  };



  const handleRedisSetResponse = async(redisKey, response) => {
    if (response === "OK") {
        console.log(`${redisKey} data set to Redis successfully!`);
        return {
          success: 200,
          message: `${redisKey} data set to Redis successfully!`
        }
    } else {
       console.log(`Error occurred while setting ${redisKey} data to Redis!`)
        return {
          success: 500,
          message: `Error occurred while setting ${redisKey} data to Redis!`
        }
    }
  };
  