const Router = require("express");
const router = Router();

router.get("/api/products", (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    if(req.cookies.atif && req.cookies.atif === "theDeveloper"){
        res.send([{
            id: 123,
            name: "Chicken legs",
            price: 12.22
        }])
    }
    res.send({ msg: "Sorry, Invalid credentials wrong cookie" })
})

module.exports = router;