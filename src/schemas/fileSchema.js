const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    objFilePath: {
        type: String,
        required: true, // Path to the .obj file
      },
      mtlFilePath: {
        type: String,
        required: false, // Path to the .mtl file
      },
      objFileName: {
        type: String, // Optional: Name of the .obj file
        required: false,
      },
      mtlFileName: {
        type: String, // Optional: Name of the .mtl file
        required: false,
      },
    });

const FileSchema = mongoose.model("File", fileSchema);
module.exports = FileSchema;