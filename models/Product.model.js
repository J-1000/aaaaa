const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type:  mongoose.SchemaTypes.Url,
      required: true
    }
  });

const User = model("User", productSchema);

module.exports = User;
