const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3400;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Multer config (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Root route: send index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// POST route: file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileData = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size // in bytes
  };

  res.json(fileData);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
