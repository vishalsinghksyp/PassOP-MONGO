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
    console.log("mongodb client connected");

    const db = client.db(dbName);

    // gett all the passwords
    app.get("/", async (req, res) => {
      const collection = db.collection("documents");
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });

    // save the passwords
    app.post("/", async (req, res) => {
      try {
        const data = req.body;

        const collection = db.collection("documents");
        const result = await collection.insertOne(data);

        res.status(201).json({
          message: "Password saved successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        res.status(500).json({ message: "Error saving password", error });
      }
    });

    app.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const collection = db.collection("documents"); // ✅ define collection
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
          res.json({ message: "Password deleted successfully" });
        } else {
          res.status(404).json({ message: "Password not found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Error deleting password", error });
      }
    });

    // PUT update password by id
    app.put("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const data = req.body;
        const collection = db.collection("documents");
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: data }
        );

        if (result.matchedCount === 1) {
          res.json({ message: "Password updated successfully" });
        } else {
          res.status(404).json({ message: "Password not found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Error updating password", error });
      }
    });

    // 🔥 YOU FORGOT THIS
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error connecting MongoDB:", error);
  }
}

startServer();
