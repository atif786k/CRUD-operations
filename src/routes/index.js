const Router = require("express");
const router = Router();

const userRoute = require("./user");
const productsRoute = require("./products")
const fileRoute = require("./files");

router.use(userRoute);
router.use(productsRoute);
router.use(fileRoute);

module.exports = router;
