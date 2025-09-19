import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "locafy",
  password: process.env.DB_PASS || "123",
  port: parseInt(process.env.DB_PORT || "3111", 10),
});

// Function to test connection
export async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully");
    client.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Stop server if DB is not connected
  }
}
