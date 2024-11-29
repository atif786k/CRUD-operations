const Router = require("express");
const router = Router();
const FileSchema = require("../schemas/fileSchema");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = [".obj", ".mtl"];
      if (allowedTypes.includes(path.extname(file.originalname).toLowerCase())) {
        cb(null, true);
      } else {
        cb(new Error("Only .obj and .mtl files are allowed!"));
      }
    },
  });

//  

router.post("/upload", upload.fields([{ name: "objFile" }, { name: "mtlFile" }]), async (req, res) => {
    try {
      const objFile = req.files?.objFile?.[0];
      const mtlFile = req.files?.mtlFile?.[0]; // This can be undefined if not uploaded
  
      // Validate that the .obj file is provided
      if (!objFile) {
        return res.status(400).json({ error: ".obj file is required!" });
      }
  
      // Prepare file details
      const fileDetails = {
        objFilePath: objFile.path,
        objFileName: objFile.originalname,
      };
  
      // If an .mtl file is provided, include its details
      if (mtlFile) {
        fileDetails.mtlFilePath = mtlFile.path;
        fileDetails.mtlFileName = mtlFile.originalname;
      }
  
      // Save file details in MongoDB
      const newFile = new FileSchema(fileDetails);
      await newFile.save();
  
      res.status(200).json({
        message: "Files uploaded successfully!",
        data: newFile,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

  module.exports = router;