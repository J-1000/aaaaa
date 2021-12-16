const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Wishlist model to whatever makes sense in this case
const wishlistSchema = new Schema(
    {
        wishlistItem: String,
    });

const Wishlist = model("Wishlist", wishlistSchema);

module.exports = Wishlist;