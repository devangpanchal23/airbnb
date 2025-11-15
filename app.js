 const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOveride = require("method-override");
const app = express();
const port = process.env.PORT || 8085;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require("ejs-mate");


// Middleware
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//method-override, ejs-mate
app.use(methodOveride("_method")); 
app.engine("ejs",ejsMate);

//public folder access
app.use(express.static(path.join(__dirname, "/public")));

// Connect to MongoDB, then start the server
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB successfully");

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
main();

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

//new route
app.get("/listings/new" , (req,res) => {
  res.render("listings/new.ejs");
})

// Fetch all listings
app.get("/listings", async (req, res) => {
  try {
    const allListing = await Listing.find();
    res.render("listings/index.ejs", { allListing });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching listings");
  }
});

// //create listing
app.post("/listings" ,async (req,res) => {
  // let {title, description, price, image,counrty,location} = req.body;
  // let listing = req.body;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  console.log(newListing);
  res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit",async (req,res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
})

//Update route
app.put("/listings/:id", async (req,res) => {
  const {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id", async (req,res) => {
  const {id} = req.params;
  const deletedList = await Listing.findByIdAndDelete(id);
  console.log(deletedList);
  res.redirect("/listings");
})

// Fetch single listing
app.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching listing");
  }
});
