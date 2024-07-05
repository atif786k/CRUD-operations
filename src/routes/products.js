const Router = require("express");
const router = Router();
const Product = require("../schemas/productSchema");

router.post("/product-create", async (req, res) => {
    if(!req.user){return res.status(401).json({msg: "Not Authenticated"})};

    const { productName, price } = req.body;
    if(!productName || !price){return res.status(400).json({msg: "Both fields are required"})};

    try {
        const newProduct = new Product({ productName, price })
        const savedProduct = await newProduct.save();
        res.status(201).json({msg: "New Product created successfully", savedProduct});
    } catch (error) {
        res.status(500).json({msg: "Some error occured"});
    }
})

router.get("/product-fetch", async (req, res) => {
    if(!req.user){
        return res.status(401).json({msg: "Not Authenticated"})
    }
    try {
        const products = await Product.find();
        if(!products){
            return res.json({msg: "Products not found"})
        }
        res.status(200).json({msg: "Products fetched", products})
    } catch (error) {
        res.status(500).json({msg: "Some error occured", error: error});
    }
})

router.delete("/product-delete/:id", async (req, res) => {
    if(!req.user){return res.status(401).json({msg: "Not Authenticated"})};

    const { params : { id } } = req;

    try {
        const findProduct = await Product.findById(id);
        if(!findProduct){return res.json({msg: "product not found"})};

        const deleteProduct = await Product.deleteOne({ _id: id });
        res.status(201).json({msg : "product deleted successfully", deleteProduct});
    } catch (error) {
        res.status(500).json({msg: "Some error occured", error});
    }
})

module.exports = router;