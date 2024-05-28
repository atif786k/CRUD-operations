const Router = require("express");
const router = Router();

const userRoute = require("./user");

router.use(userRoute);

module.exports = router;
