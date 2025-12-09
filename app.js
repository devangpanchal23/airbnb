const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOveride = require("method-override");
const app = express();
const port = process.env.PORT || 8085;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const { listingSchema } = require("./schema.js");

// Middleware
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (for API clients like Hoppscotch)
app.use(express.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//method-override, ejs-mate
app.use(methodOveride("_method"));
app.engine("ejs", ejsMate);

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

const validateListing = (req, res, next) => {
  // Normalize payload so validation always expects `{ listing: { ... } }`.
  const payload = req.body && req.body.listing ? req.body : { listing: req.body };
  // Allow Joi to convert types (strings -> numbers) where possible
  const { error, value } = listingSchema.validate(payload, { convert: true });
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  }
  // Ensure `req.body.listing` exists and coerce price to Number
  req.body.listing = value.listing;
  if (req.body.listing && req.body.listing.price != null) {
    req.body.listing.price = Number(req.body.listing.price);
  }
  next();
};

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Fetch all listings
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find();
    res.render("listings/index.ejs", { allListing });
  })
);

// //create listing
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

//edit route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//Update route
app.put(
  "/listings/:id", validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    // Fetch old listing
    const oldListing = await Listing.findById(id);
    // Merge updated fields
    const updatedData = { ...req.body.listing };
    // 🔥 Keep the old image if user didn't update it
    updatedData.image = oldListing.image;  
    await Listing.findByIdAndUpdate(id, updatedData);
    res.redirect(`/listings/${id}`);
  })
);

//delete route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings");
  })
);

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
// Error handling middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});
