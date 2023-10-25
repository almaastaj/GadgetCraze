import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT;

connectDB(); // Connect to MongoDB
const app = express();
// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// For Paypal Integration
app.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
