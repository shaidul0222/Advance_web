import express from "express";
import cors from "cors";
import pool from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Needed in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

app.get("/api/orders", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id,
        fullname,
        email,
        phone,
        item,
        start_date,
        end_date,
        qty,
        message,
        terms_accepted,
        newsletter,
        created_at
       FROM orders
       ORDER BY id DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Fetch orders failed:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone,
      item,
      start,
      end,
      qty,
      message,
      termsAccepted,
      newsletter,
    } = req.body;

    if (
      !fullname ||
      !email ||
      !phone ||
      !item ||
      !start ||
      !end ||
      !qty ||
      termsAccepted !== true
    ) {
      return res.status(400).json({
        error: "Missing required fields or terms not accepted",
      });
    }

    const result = await pool.query(
      `INSERT INTO orders
      (fullname, email, phone, item, start_date, end_date, qty, message, terms_accepted, newsletter)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, fullname, email, phone, item, start_date, end_date, qty, message, terms_accepted, newsletter, created_at`,
      [
        fullname,
        email,
        phone,
        item,
        start,
        end,
        qty,
        message || "",
        termsAccepted,
        newsletter ?? false,
      ]
    );

    res.status(201).json({
      message: "Order submitted successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Insert order failed:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});