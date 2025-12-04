require('dotenv').config();

// Determine which database to use (PostgreSQL or MySQL)
const DB_TYPE = process.env.DB_TYPE || 'postgres'; // 'postgres' or 'mysql'

let db;

if (DB_TYPE === 'postgres') {
  // PostgreSQL configuration
  const { Pool } = require('pg');
  
  db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? {
      rejectUnauthorized: false
    } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
} else {
  // MySQL configuration
  const mysql = require('mysql2/promise');
  
  db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.DB_SSL === 'true' ? {
      rejectUnauthorized: false
    } : false
  });
}

// Test connection
const testConnection = async () => {
  try {
    if (DB_TYPE === 'postgres') {
      const client = await db.connect();
      console.log('PostgreSQL database connected successfully');
      client.release();
    } else {
      const connection = await db.getConnection();
      console.log('MySQL database connected successfully');
      connection.release();
    }
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

module.exports = { db, testConnection, DB_TYPE };
