const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default: "https://media.istockphoto.com/id/2203935683/photo/img_6554-matera-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=dk6usesLMhWifnllBd-895AmX_vT-gR69XFVBiZNc0w=",
      set: (v) => (v === " " ? "https://media.istockphoto.com/id/2203935683/photo/img_6554-matera-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=dk6usesLMhWifnllBd-895AmX_vT-gR69XFVBiZNc0w=" : v),
    },
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
