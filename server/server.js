const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON data

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});

// Example endpoint to fetch all users
app.get('/words', (req, res) => {
    const query = 'SELECT * FROM words';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database Retrieval Error:', err);
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        res.status(200).json(results);
    });
});

// PUT request to update a word in the database
app.put('/words/:id', (req, res) => {
    const { id } = req.params; // Get the word ID from the URL parameters
    const { word, definition } = req.body; // Get the updated word and definition from the request body
  
    const query = 'UPDATE words SET word = ?, definition = ? WHERE id = ?';
    
    db.query(query, [word, definition, id], (err, results) => {
      if (err) {
        console.error('Database Update Error:', err);
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
  
      if (results.affectedRows === 0) {
        // No rows were updated, meaning the ID doesn't exist in the database
        return res.status(404).json({ error: 'Word not found' });
      }
  
      res.status(200).json({ message: 'Word updated successfully' });
    });
  });

app.post('/words', (req, res) => {
    const { id, word, definition } = req.body;
    const query = 'INSERT INTO words (id, word, definition) VALUES (?, ?, ?)';

    db.query(query, [id, word, definition], (err, results) => {
        if (err) {
            console.error('Database Insertion Error:', err);  // Log the error to the console
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        res.status(201).json({ id, word, definition });
    });
});

app.delete('/words/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM words WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Database Deletion Error:', err);
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Word not found' });
        }

        res.status(204).send(); // No Content
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
