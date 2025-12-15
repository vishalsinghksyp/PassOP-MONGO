const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = "PassOP";
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB client connected");

    const db = client.db(dbName);

    // ------------------ USERS ------------------

    app.post("/signup", async (req, res) => {
      try {
        const { name, email, password } = req.body;
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        await usersCollection.insertOne({ name, email, password });
        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err });
      }
    });

    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.password !== password)
          return res.status(401).json({ message: "Incorrect password" });

        // Send back email so frontend knows who is logged in
        const token = "dummy-token"; // later replace with JWT
        res.json({ message: "Login successful", token, email: user.email });
      } catch (err) {
        res.status(500).json({ message: "Login failed", error: err });
      }
    });

    // ------------------ PASSWORDS ------------------

    const passwordsCollection = db.collection("documents");

    // Get passwords for logged-in user
    app.get("/", async (req, res) => {
      const userEmail = req.headers.userid; // frontend sends user email in headers
      if (!userEmail) return res.status(401).json({ message: "Unauthorized" });

      const passwords = await passwordsCollection.find({ userEmail }).toArray();
      res.json(passwords);
    });

    // Add password for logged-in user
    app.post("/", async (req, res) => {
      try {
        const userEmail = req.headers.userid;
        if (!userEmail)
          return res.status(401).json({ message: "Unauthorized" });

        const data = { ...req.body, userEmail }; // attach userEmail
        const result = await passwordsCollection.insertOne(data);
        res.status(201).json({
          message: "Password saved successfully",
          insertedId: result.insertedId,
        });
      } catch (err) {
        res.status(500).json({ message: "Error saving password", error: err });
      }
    });

    // Delete password (only owner)
    app.delete("/:id", async (req, res) => {
      try {
        const userEmail = req.headers.userid;
        if (!userEmail)
          return res.status(401).json({ message: "Unauthorized" });

        const { id } = req.params;
        const result = await passwordsCollection.deleteOne({
          _id: new ObjectId(id),
          userEmail,
        });

        if (result.deletedCount === 1)
          res.json({ message: "Password deleted successfully" });
        else res.status(404).json({ message: "Password not found" });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error deleting password", error: err });
      }
    });

    // Update password (only owner)
    app.put("/:id", async (req, res) => {
      try {
        const userEmail = req.headers.userid;
        if (!userEmail)
          return res.status(401).json({ message: "Unauthorized" });

        const { id } = req.params;
        const data = req.body;

        const result = await passwordsCollection.updateOne(
          { _id: new ObjectId(id), userEmail },
          { $set: data }
        );

        if (result.matchedCount === 1)
          res.json({ message: "Password updated successfully" });
        else res.status(404).json({ message: "Password not found" });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error updating password", error: err });
      }
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Error connecting MongoDB:", err);
  }
}

startServer();
