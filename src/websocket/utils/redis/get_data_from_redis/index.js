import redisClient from "../../../../config/redis/index.js";


export const handleGetDataFromRedisAction = async (redisKey) => {
    try {
        const result = await redisClient.get(redisKey);
  
        if (result === null) {
            return {
                success: false,
                message: "No data found for the provided key.",
                code: 404,
            };
        }
  
        let parsedResult;
        try {
            parsedResult = JSON.parse(result);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return {
                success: false,
                message: "Stored value is not valid JSON.",
                code: 400,
            };
        }
  
        return {
            success: true,
            message: "Redis value fetched successfully.",
            data: parsedResult,
            code: 200,
        };
    } catch (error) {
        console.error('Error fetching data from Redis:', error);
  
        return {
            success: false,
            message: "Error fetching data from Redis.",
            code: 500,
        };
    }
  };
  