const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const todo_collection = database.collection("todo_collection");

    app.post(`${apiVersion}/user`, async (req, res) => {
      const data = req.body;
      const result = await user_collection.insertOne(data);
      res.send(result);
    });

    app.post(`${apiVersion}/todo`, async (req, res) => {
      const data = req.body;
      const result = await todo_collection.insertOne(data);
      res.send(result);
    });
    app.get(`${apiVersion}/todo/:uid`, async (req, res) => {
      const uid = req.params.uid;
      const result = await todo_collection.find({ "user.uid": uid }).toArray();

      if (result.length === 0) {
        // No matching todos found for the provided uid
        res.status(404).send({
          status: false,
          status_code: 404,
          status_message: "Data not found",
          error_message: "No todos found for the provided UID",
          data: result,
        });
      } else {
        // Todos found for the provided uid
        res.send({
          status: true,
          status_code: 200,
          status_message: "Data found successfully",
          data: result,
        });
      }
    });

    app.patch(`${apiVersion}/todo/:id`, async (req, res) => {
      const todoId = req.params.id;
      const { status } = req.body; // Assuming you send the new status in the request body

      try {
        const result = await todo_collection.findOneAndUpdate(
          { _id: new ObjectId(todoId) },
          { $set: { status: status } },
          { returnDocument: "after" } // Return the updated document
        );

        if (!result.value) {
          // No matching todo found for the provided ID
          res.status(404).send({
            status: false,
            status_code: 404,
            status_message: "Todo not found",
            error_message: "No todo found for the provided ID",
            data: null,
          });
        } else {
          // Todo found and updated successfully
          res.send({
            status: true,
            status_code: 200,
            status_message: "Todo updated successfully",
            data: result.value,
          });
        }
      } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).send({
          status: false,
          status_code: 500,
          status_message: "Internal Server Error",
          error_message: "Error updating todo",
          data: null,
        });
      }
    });
    app.delete(`${apiVersion}/todo/:id`, async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await todo_collection.deleteOne(query);
      res.send(result);
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
