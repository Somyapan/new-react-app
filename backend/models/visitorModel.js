const { db, DB_TYPE } = require('../config/database');

// Create visitors table if not exists
const initializeTable = async () => {
  const createTableQuery = DB_TYPE === 'postgres' 
    ? `CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        purpose TEXT NOT NULL,
        company VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    : `CREATE TABLE IF NOT EXISTS visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        purpose TEXT NOT NULL,
        company VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;

  try {
    if (DB_TYPE === 'postgres') {
      await db.query(createTableQuery);
    } else {
      await db.query(createTableQuery);
    }
    console.log('Visitors table initialized');
  } catch (error) {
    console.error('Error initializing table:', error);
    throw error;
  }
};

// Initialize table on module load
initializeTable();

// Create a new visitor
exports.createVisitor = async (visitorData) => {
  const { name, email, phone, purpose, company } = visitorData;
  
  const query = DB_TYPE === 'postgres'
    ? 'INSERT INTO visitors (name, email, phone, purpose, company) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    : 'INSERT INTO visitors (name, email, phone, purpose, company) VALUES (?, ?, ?, ?, ?)';

  try {
    if (DB_TYPE === 'postgres') {
      const result = await db.query(query, [name, email, phone, purpose, company]);
      return result.rows[0];
    } else {
      const [result] = await db.query(query, [name, email, phone, purpose, company]);
      return { id: result.insertId, name, email, phone, purpose, company };
    }
  } catch (error) {
    console.error('Error creating visitor:', error);
    throw error;
  }
};

// Get all visitors
exports.getAllVisitors = async () => {
  const query = 'SELECT * FROM visitors ORDER BY created_at DESC';

  try {
    if (DB_TYPE === 'postgres') {
      const result = await db.query(query);
      return result.rows;
    } else {
      const [rows] = await db.query(query);
      return rows;
    }
  } catch (error) {
    console.error('Error fetching visitors:', error);
    throw error;
  }
};

// Get visitor by ID
exports.getVisitorById = async (id) => {
  const query = DB_TYPE === 'postgres'
    ? 'SELECT * FROM visitors WHERE id = $1'
    : 'SELECT * FROM visitors WHERE id = ?';

  try {
    if (DB_TYPE === 'postgres') {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } else {
      const [rows] = await db.query(query, [id]);
      return rows[0];
    }
  } catch (error) {
    console.error('Error fetching visitor:', error);
    throw error;
  }
};

// Update visitor
exports.updateVisitor = async (id, visitorData) => {
  const { name, email, phone, purpose, company } = visitorData;
  
  const query = DB_TYPE === 'postgres'
    ? 'UPDATE visitors SET name = $1, email = $2, phone = $3, purpose = $4, company = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *'
    : 'UPDATE visitors SET name = ?, email = ?, phone = ?, purpose = ?, company = ? WHERE id = ?';

  try {
    if (DB_TYPE === 'postgres') {
      const result = await db.query(query, [name, email, phone, purpose, company, id]);
      return result.rows[0];
    } else {
      const [result] = await db.query(query, [name, email, phone, purpose, company, id]);
      if (result.affectedRows === 0) return null;
      return await exports.getVisitorById(id);
    }
  } catch (error) {
    console.error('Error updating visitor:', error);
    throw error;
  }
};

// Delete visitor
exports.deleteVisitor = async (id) => {
  const query = DB_TYPE === 'postgres'
    ? 'DELETE FROM visitors WHERE id = $1'
    : 'DELETE FROM visitors WHERE id = ?';

  try {
    if (DB_TYPE === 'postgres') {
      const result = await db.query(query, [id]);
      return result.rowCount > 0;
    } else {
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    }
  } catch (error) {
    console.error('Error deleting visitor:', error);
    throw error;
  }
};
