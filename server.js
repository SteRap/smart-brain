const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./Controllers/register");
const signin = require("./Controllers/signin");
const profile = require("./Controllers/profile");
const image = require("./Controllers/image");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It's working!");
});
app.post("/signin", signin.handleSignIn(db, bcrypt));
app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);
app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));
app.put("/image", (req, res) => image.handleImage(res, req, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
