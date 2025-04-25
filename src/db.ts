import dotenv from "dotenv";
import pg from 'pg';

dotenv.config();

const { Pool } = pg

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: "selfimprovementapp"
});

export default pool;