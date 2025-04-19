const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const redis = require("redis");
const client = require("prom-client"); // ✅ Add this line

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Prometheus: Collect default metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// 🔥 Optional: Custom metric example
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Use middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// MongoDB connection
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
