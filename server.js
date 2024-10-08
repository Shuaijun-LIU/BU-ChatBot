require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Use the MongoDB connection string from environment variables
mongoose.connect(process.env.MONGO_URI);

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');

app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use openai routes with error handling
try {
    const gptChatRoutes = require('./routes/openai');
    app.use('/openai', gptChatRoutes);
} catch (error) {
    console.error('Error loading OpenAI routes:', error);
}

// Page route handling
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

app.get('/gpt-chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gpt-chat.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/faq-management', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'faq-management.html'));
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});