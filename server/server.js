import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env file
dotenv.config();

const app = express();

const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.PUBLIC_API_KEY;
console.log(supabaseUrl);
console.log(supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Define Routes

// Get all art
app.get("/api/art", (req, res) => {
  res.json({ msg: "Fetch art" });
});

// Upload art
app.post("/api/art/upload", (req, res) => {
  res.json({ msg: "Add art" });
});

// Update art
app.put("/api/art/:id", (req, res) => {
  res.json({ msg: "Update art" });
});

// Create user
app.post("/api/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // Handle error in sign up
      return res.status(400).json({ message: "Error signing up", error });
    }

    // User created successfully and session created successfully
    res
      .status(200)
      .json({ message: "User created successfully", user, session });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
