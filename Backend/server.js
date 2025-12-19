const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const url = process.env.MONGO_URL_LOCAL;
const client = new MongoClient(url);
const dbName = "PassOP";
const port = process.env.PORT || 3000;

// ------------------ AUTH MIDDLEWARE ------------------
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB client connected");

    const db = client.db(dbName);
    const usersCollection = db.collection("users");
    const passwordsCollection = db.collection("documents");

    // ------------------ SIGNUP ------------------
    app.post("/signup", async (req, res) => {
      try {
        const { name, email, password } = req.body;

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await usersCollection.insertOne({
          name,
          email,
          password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err });
      }
    });

    // ------------------ LOGIN ------------------
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(401).json({ message: "Incorrect password" });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.json({ message: "Login successful", token });
      } catch (err) {
        res.status(500).json({ message: "Login failed", error: err });
      }
    });

    // ------------------ GET PASSWORDS ------------------
    app.get("/", verifyToken, async (req, res) => {
      try {
        const passwords = await passwordsCollection
          .find({ userEmail: req.userEmail })
          .toArray();

        const decryptedPasswords = passwords.map((p) => ({
          ...p,
          password: CryptoJS.AES.decrypt(
            p.password,
            process.env.SECRET_KEY
          ).toString(CryptoJS.enc.Utf8),
        }));

        res.json(decryptedPasswords);
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error fetching passwords", error: err });
      }
    });

    // ------------------ ADD PASSWORD ------------------
    app.post("/", verifyToken, async (req, res) => {
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();

        const data = {
          site: req.body.site,
          username: req.body.username,
          password: encryptedPassword,
          userEmail: req.userEmail,
        };

        const result = await passwordsCollection.insertOne(data);

        res.status(201).json({
          message: "Password saved successfully",
          insertedId: result.insertedId,
        });
      } catch (err) {
        res.status(500).json({ message: "Error saving password", error: err });
      }
    });

    // ------------------ DELETE PASSWORD ------------------
    app.delete("/:id", verifyToken, async (req, res) => {
      try {
        const result = await passwordsCollection.deleteOne({
          _id: new ObjectId(req.params.id),
          userEmail: req.userEmail,
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

    // ------------------ UPDATE PASSWORD ------------------
    app.put("/:id", verifyToken, async (req, res) => {
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();

        const result = await passwordsCollection.updateOne(
          { _id: new ObjectId(req.params.id), userEmail: req.userEmail },
          {
            $set: {
              site: req.body.site,
              username: req.body.username,
              password: encryptedPassword,
            },
          }
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

    // ------------------ START SERVER ------------------
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Error connecting MongoDB:", err);
  }
}

startServer();
