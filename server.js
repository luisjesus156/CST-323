const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chucho11J!', // Your MAMP MySQL password
    database: 'cloud_test_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');

    // Create table if it doesn't exist
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255)
    );
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Users table created or already exists.');
    });
});

// Create (POST) - Add a new user
app.post('/add-user', (req, res) => {
    const user = { name: req.body.name, email: req.body.email };
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        res.send('User added');
    });
});

// Read (GET) - Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Read (GET) - Get a specific user by ID
app.get('/users/:id', (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result[0]); // Return a single user
    });
});

// Update (PUT) - Update a user's information
app.put('/update-user/:id', (req, res) => {
    const updatedUser = { name: req.body.name, email: req.body.email };
    const sql = `UPDATE users SET ? WHERE id = ${req.params.id}`;
    db.query(sql, updatedUser, (err, result) => {
        if (err) throw err;
        res.send('User updated');
    });
});

// Delete (DELETE) - Delete a user
app.delete('/delete-user/:id', (req, res) => {
    const sql = `DELETE FROM users WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User deleted');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
