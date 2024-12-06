import pkg from 'pg';

import dotenv from 'dotenv';


const { Pool } = pkg;


dotenv.config();

const { 
    PSQL_USER, 
    PSQL_HOST, 
    PSQL_DATABASE, 
    PSQL_PORT,
} = process.env;


const postgreConfig = {
  user: PSQL_USER,
  host: PSQL_HOST,
  database: PSQL_DATABASE,
  port: PSQL_PORT ? parseInt(PSQL_PORT, 10) : undefined 
}



const pool = new Pool(postgreConfig);


  export {
    pool
  }