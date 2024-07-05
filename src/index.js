const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mockUsers = require("./utils/userData");
const routes = require("./routes/index");
const passport = require("passport");
const mongoose = require("mongoose");
require("./auth/local.js");
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost/crud_operation_express")
  .then(() => console.log("Connected to MongoDB Database"))
  .catch((err) => console.log("Error: ", err));

app.use(cookieParser("atiftheDeveloper"));
app.use(
  session({
    secret: "atif the developer",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);  

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get("/", (req, res) => {
  // res.cookie("atif", " ", { maxAge: 60000 * 60 })
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.send("Home Page 🏠");
});

app.get("/api/users", (req, res) => {
  console.log(req.session.id);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  res.send(mockUsers);
});

// app.post("/api/auth", (req, res) => {
//   const {body: {username, password},} = req;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if(!findUser || findUser.password !== password){
//     res.status(401).send({msg: "Bad Credentials"});
//   }
//   req.session.user = findUser;
//   res.status(200).send(findUser);
// })
// app.get("/api/auth/status", (req, res) => {
//   req.sessionStore.get(req.sessionID, (err, session) => {
//     console.log(session);
//   });
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({ msg: "Not Authenticated" });
// });

// Passport js authentication :-
app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  console.log(req.session);
  res.status(200).send("authenticated");
});

app.get("/api/auth/status", (req, res) => {
  // console.log("Inside /api/auth/status endpoint");
  if (req.user) {
    res.status(200).json({msg: "USer is loged in"});
  } else {
    res.status(401).send({ msg: "Not Authenticated" });
  }
});

app.listen(PORT, (req, res) => {
  console.log("Listening on port : ", PORT);
});
