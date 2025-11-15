import mongoose from "mongoose";
import Listing from "../models/listing.js";
import initData from "./data.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const main = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB successfully");

    await initDB();

    await mongoose.connection.close();
    console.log("🚀 Connection closed — seeding complete");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

const initDB = async () => {
  try {
    // Uncomment below lines when you want to actually reset/seed data
    // await Listing.deleteMany({});
    // await Listing.insertMany(initData.data);

    console.log("🌱 Data initialized successfully");
  } catch (err) {
    console.error("❌ Error initializing data:", err);
  }
};

main();
 