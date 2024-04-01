const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./todoModel");
const UserModel = require("./userModel");
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb+srv://dk438916:Deepak123@cluster0.2tum63n.mongodb.net/", {})
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Failed to connect");
  });
const validator = async function (req, res, next) {
  const reqHeader = req.headers.auth;
  const decriptTocken = base64.decode(reqHeader);
  const [email, password] = decriptTocken.split(":");
  const user = new UserModel();
  const findByEmail = await UserModel.findOne({ email, password });
  if (findByEmail) {
    next();
  } else {
    res.end("user not found");
  }
};

app.post("/todo", validator, (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({
    text,
  });

  newTodo
    .save()
    .then(() => {
      console.log(" saved successfully");
      res.status(200).end("success");
    })
    .catch(() => {
      console.log("error while saving: " + newTodo);
      res.status(404).end("error");
    });
});
//-----------
app.get("/todo", validator, async function (req, res) {
  const allTodo = await Todo.find();
  res.json(allTodo);
});
//get one
app.get("/todo/:id", async function (req, res) {
  const idTodo = req.params.id;
  const todoOne = await Todo.findOne({ _id: idTodo });
  res.json(todoOne);
});
//delete todo
app.delete("/todo/:id", async function (req, res) {
  const idTodo = req.params.id;
  const todoD = await Todo.findOneAndDelete({ _id: idTodo });
  res.json(todoD);
});
//update
app.put("/todo/:id", async function (req, res) {
  const idTodo = req.params.id;
  const todoD = await Todo.findOneAndUpdate({ _id: idTodo }, req.body);
  res.json(todoD);
});
//Regester user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.end("user already registered");
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: newPassword });
    console.log(newUser);
    const finalUser = await newUser.save();
    res.end("User saved successfully added");
  } catch (err) {}
});
//log in
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userByEmail = await UserModel.findOne({ email: email });
    if (!userByEmail) {
      return res.end("plese register first");
    }
    const userPassword = await bcrypt.compare(password, userByEmail.password);
    if (userPassword) {
      const encriptToken = base64.encode(`${email}:${password}`);
      res.json({
        message: "login successful",
        token: encriptToken,
      });
    } else {
      res.end("invailid cradential");
    }
  } catch (err) {
    console.log(err);
  }
});
app.get("/api", async (req, res) => {
  let data = await fetch("https://api.publicapis.org/entries");
  let jsondata = await response.json(data);
  res.end(jsondata);
});
app.listen(8080, () => {
  console.log("listening on port 8080");
});
