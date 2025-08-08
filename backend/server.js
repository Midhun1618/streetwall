const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1); // Stop the app
});

const Message = mongoose.model("Message", new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
}));

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    console.error("GET /api/messages error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const newMessage = new Message({ text: req.body.text });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.error("POST /api/messages error:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
