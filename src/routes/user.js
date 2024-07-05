const Router = require("express");
const router = Router();
const passport = require("passport");
const User = require("../schemas/usersSchema");

const mockUsers = require("../utils/userData");
const resolveUserByID = require("../utils/middleWare");

router.get("/api/users/:id", resolveUserByID, (req, res) => {
  // We can also search with the username: /api/users/:username
  const { findUserIndex } = req;
  const userFind = mockUsers.find(
    (user) => user.id === mockUsers[findUserIndex].id
  );
  if (!userFind) {
    res.status(404).send("Couldn't find the user you are looking for");
  }
  res.send(userFind);
});
// router.post("/api/users", (req, res) => {
//   const { body } = req;
//   const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
//   mockUsers.push(newUser);
//   res.send(newUser);
//   console.log(mockUsers);
// });

//Post method with mongoDB database:-
router.post("/api/register", async (req, res) => {
    const {body} = req;
    const newUser = new User(body);
    try {
      const savedUser = await newUser.save();
      res.status(201).send("User Created successfully", savedUser);
    } catch (error) {
      console.log(`Error: ${error}`)
      res.status(400);
    }
})

// router.post("/api/login", passport.authenticate("local"), (req, res) => {
//   console.log(req.session);
//   res.status(200).send("User Loged in");
// });

// router.get("/api/login/status", (req, res) => {
//   // console.log("Inside /api/auth/status endpoint");
//   if (req.user) {
//     res.status(200).send("Authenticated", req.user);
//   } else {
//     res.status(401).send({ msg: "Not Authenticated" });
//   }
// });

router.put("/api/users/:id", resolveUserByID, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  res.send(mockUsers[findUserIndex]);
});

router.patch("/api/users/:id", resolveUserByID, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  res.send(mockUsers[findUserIndex]);
});

router.delete("/api/users/:id", resolveUserByID, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  //.splice(jaha se shuru krna hai delete krna, kitna delete krna hai Matlab ek delete krna hai ya doo etc.. from starting index)
  res.send(mockUsers);
});

module.exports = router;
