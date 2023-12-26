import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env file
dotenv.config();
const app = express();

const {
  DATABASE_URL: supabaseUrl,
  PUBLIC_API_KEY: supabasePublicAPIKey,
  SECRET_API_KEY: supabaseSecretAPIKey,
  SUPABASE_PROJECT_ID: supabaseProjectID,
  STORAGE_BUCKET: supabaseStorageBucket,
  FRONTEND_URL: originURL,
  AUTH_TOKEN: authToken,
} = process.env;

const supabase = createClient(supabaseUrl, supabasePublicAPIKey);
console.log(originURL);

app.use(express.json());

// Cors middleware
const corsOptions = {
  origin: originURL,
  optionsSuccessStatus: 200,
};
console.log(corsOptions);
app.use(cors(corsOptions));

// Middleware logging
app.use((req, res, next) => {
  console.log(`💻 Call logged: Method: ${req.method} URL: ${req.url}`);
  next();
});

// Middleware for authentication
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token === `Bearer ${authToken}`) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Not authorized. Did you provide a valid auth token?" });
  }
};

// Endpoints

// Authorization endpoint
app.get("/api/auth", authenticate, async (req, res) => {
  res.json({
    supabaseUrl: supabaseUrl,
    supabaseKey: supabasePublicAPIKey,
    supabaseSecretAPIKey: supabaseSecretAPIKey,
    supabaseProjectID: supabaseProjectID,
  });
});

// Create user endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // Handle error in sign up
      return res.status(400).json({ message: "Error signing up", error });
    }

    // Post signup logic
    const {
      data: { getuser },
    } = await supabase.auth.getUser();

    // User created successfully and session created successfully
    res.status(200).json({ message: "User created successfully", getuser });
    console.log(getuser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Login user endpoint
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

// Logout user endpoint
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

// Get images endpoint

app.get("/api/images", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("art")
      .select("id, title, description, image_url");

    if (error) {
      // Handle error in fetching data
      return res.status(400).json({ message: "Error fetching data", error });
    }

    // Data fetched successfully
    res.status(200).json({ message: "Data fetched successfully", data });
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
app.listen(PORT, () => console.log(`📡 Server listening on port ${PORT}`));
