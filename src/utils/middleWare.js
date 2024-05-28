const mockUsers = require("./userData");
const resolveUserByID = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parseID = parseInt(id);
  if (isNaN(parseID)) {
    res.send("Invalid ID. Please enter the correct ID");
    res.status(400);
  }
  const findUserIndex = mockUsers.findIndex((user) => user.id === parseID);
  if (findUserIndex === -1) return res.status(404);
  req.findUserIndex = findUserIndex;
  next();
};

module.exports = resolveUserByID;
