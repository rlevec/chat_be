import dotenv from 'dotenv';


dotenv.config();

const { 
    PORT,
    FE_URL
} = process.env;


export const config = {
    development: {
      app: {
       port: PORT,
      },
    },
    production: {
       app: {

       }
    },
    feUrl: FE_URL
}