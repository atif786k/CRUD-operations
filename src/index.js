const express = require("express");
const app = express();
const session = require("express-session");
const mockUsers = require("./utils/userData");
const routes = require("./routes/index");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Home Page 🏠");
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  res.send(mockUsers);
});

app.listen(PORT, (req, res) => {
  console.log("Listening on port : ", PORT);
});
