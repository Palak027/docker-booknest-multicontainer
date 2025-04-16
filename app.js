const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const redis = require("redis");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Redis client setup
//const redisClient = redis.createClient({
//   socket: {
//     host: "redisContainer", // Use Redis container name
//     port: 6379, // Redis default port
//   },
// });

// redisClient.connect()
//   .then(() => console.log("Connected to Redis"))
//   .catch((err) => console.error("Redis connection error:", err));

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World from BookNest 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
