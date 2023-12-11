import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env file
dotenv.config();
const app = express();
const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.PUBLIC_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const origin = process.env.FRONTEND_URL;
console.log(origin);

app.use(express.json());

// Cors middleware
const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200,
};
console.log(corsOptions);
app.use(cors(corsOptions));

// Define Routes

// Create a user
app.post("/api/signup", async (req, res) => {
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

// Login a user
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Handle error in sign in
      return res.status(400).json({ message: "Error signing in", error });
    }

    // User signed in successfully and session created successfully
    res
      .status(200)
      .json({ message: "User signed in successfully", user, session });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Logout a user
app.post("/api/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // Handle error in sign out
      return res.status(400).json({ message: "Error signing out", error });
    }

    // User signed out successfully
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Upload art
app.post("/api/art/upload", async (req, res) => {
  try {
    const { title, description, image_url } = req.body;
    const { data, error } = await supabase
      .from("art")
      .insert([{ title, description, image_url }]);

    if (error) {
      // Handle error in inserting into table
      return res.status(400).json({ message: "Error with upload", error });
    }

    // Art uploaded successfully
    res.status(200).json({ message: "Upload successful", data });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
