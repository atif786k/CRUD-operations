const Router = require("express");
const router = Router();

const userRoute = require("./user");
const productsRoute = require("./products")

router.use(userRoute);
router.use(productsRoute);

module.exports = router;
