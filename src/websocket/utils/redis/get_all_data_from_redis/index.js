import redisClient from "../../../../config/redis/index.js";

export const handleGetAllDataFromRedis = async () => {
  try {
    const result = {};

    
    const keys = await new Promise((resolve, reject) => {
      redisClient.keys('*', (err, keys) => {
        if (err) reject(err);
        else resolve(keys);
      });
    });

    
    const userKeys = keys.filter((key) => key.includes("user") && !key.includes("socketId"));


    await Promise.all(userKeys.map(async (key) => {
      const value = await new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
          if (err) reject(err);
          else resolve(value);
        });
      });

      try {
        const parsedValue = JSON.parse(value);
        const username = parsedValue?.username;
        if (username) {
          result[username] = "online";
        }
      } catch (parseError) {
        console.error(`Error parsing JSON for key ${key}:`, parseError);
      }
    }));


    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching data from Redis:", error);

    return {
      error: true,
      message: "Error fetching data from Redis.",
      code: 500,
    };
  }
};
