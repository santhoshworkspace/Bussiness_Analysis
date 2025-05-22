import express from "express";
import productRoutes from "./routes/productRoutes.js";
import { setupSwagger, connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Setup Swagger
setupSwagger(app);

// Routes
app.use("/api", productRoutes);

// Connect to MongoDB
connectDB();

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});