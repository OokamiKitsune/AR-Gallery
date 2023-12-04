import express from "express";
import dotenv from "dotenv";
const app = express();
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hxsxzqopqnktoldqenle.supabase.co";

// TODO: Authenticate with Supabase to create users
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

dotenv.config();
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
    const newUser = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });

    res
      .status(201)
      .json({ message: "New user created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
