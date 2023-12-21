const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

const apiVersion = "/api/v0.1";
const uri = process.env.MongoDB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("TaskManagementDB");
    const user_collection = database.collection("user_collection");

    app.post(`${apiVersion}/user`, async (req, res) => {
      const data = req.body;
      const result = await user_collection.insertOne(data)
      console.log(data);
      res.send(result)
    });

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.use((req, res, next) => {
  res.status(404).json({
    status_code: 404,
    status_message: "Data not found",
    error_details:
      "The requested endpoint does not exist or the resource is not available.",
    requested_url: req.originalUrl,
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
