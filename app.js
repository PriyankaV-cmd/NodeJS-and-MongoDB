const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
// Use localhost when running Node.js locally
// Use "mongo" when running inside Docker network
const MONGO_URI = process.env.MONGO_URI ||
    'mongodb://admin:qwerty@localhost:27017/mytaskproject-db?authSource=admin';

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ Connection error:", err));

// ✅ Define a simple schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', UserSchema);

// ✅ Routes
app.get('/', (req, res) => {
    res.send("Node.js + MongoDB app is running 🚀");
});

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/getUsers', async (req, res) => {
    try {
    const users = await User.find();
    res.json(users);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// ✅ Start server on port 8082
app.listen(8082, ()=> {
    console.log("Server running on port 8082");
        });



