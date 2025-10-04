import mongoose from "mongoose";
import User from "./src/models/User.js";
import Category from "./src/models/Category.js";
import Question from "./src/models/Question.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Question.deleteMany({});
    console.log("Cleared existing data");

    // Create Users
    const users = await User.insertMany([
      {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password123",
      },
      {
        username: "mike_wilson",
        email: "mike@example.com",
        password: "password123",
      },
    ]);
    console.log("Created users");

    // Create Categories
    const categories = await Category.insertMany([
      {
        name: "Guitar",
        description: "Questions about guitars and guitar playing",
      },
      {
        name: "Drums",
        description: "Questions about drums and drumming techniques",
      },
      { name: "Bass", description: "Questions about bass guitars" },
    ]);
    console.log("Created categories");

    // Create Questions with embedded answers
    await Question.insertMany([
      {
        userId: users[0]._id,
        category: categories[0]._id, // Guitar
        title: "How do I restring the guitar?",
        body: "I just bought this strat and I have no clue how to restring it. Please help!",
        answered: true,
        answers: [
          {
            userId: users[1]._id,
            body: "Remove old strings one at a time, clean the fretboard, then insert new string through bridge and wind around tuning peg. Check YouTube for visual guides!",
            createdAt: new Date("2024-01-15"),
          },
          {
            userId: users[2]._id,
            body: "Pro tip: Use a string winder tool to speed up the process. Also, stretch your strings after tuning to help them stay in tune.",
            createdAt: new Date("2024-01-16"),
          },
        ],
      },
      {
        userId: users[1]._id,
        category: categories[0]._id, // Guitar
        title: "Is mayonaisse an instrument",
        body: "I've been dying to know GOD please help me!",
        answered: false,
        answers: [],
      },
      {
        userId: users[2]._id,
        category: categories[1]._id, // Drums
        title: "Best drumsticks for beginners?",
        body: "I am just starting to learn drums. What drumsticks should I buy?",
        answered: true,
        answers: [
          {
            userId: users[0]._id,
            body: "I recommend starting with 5A sticks. They are versatile and not too heavy. Vic Firth and Promark make great beginner sticks.",
            createdAt: new Date("2024-01-14"),
          },
        ],
      },
      {
        userId: users[0]._id,
        category: categories[1]._id, // Drums
        title: "How to improve my double bass pedal technique?",
        body: "I have been practicing for months but still struggling with speed.",
        answered: true,
        answers: [
          {
            userId: users[1]._id,
            body: "Practice heel-toe technique slowly at first. Use a metronome and gradually increase tempo. Also check your pedal tension.",
            createdAt: new Date("2024-01-17"),
          },
          {
            userId: users[2]._id,
            body: "Watch some videos by drum teachers like Jared Falk. Proper ankle technique is key!",
            createdAt: new Date("2024-01-18"),
          },
        ],
      },
      {
        userId: users[1]._id,
        category: categories[2]._id, // Bass
        title: "Difference between 4-string and 5-string bass?",
        body: "Should I upgrade to a 5-string bass or stick with my 4-string?",
        answered: true,
        answers: [
          {
            userId: users[2]._id,
            body: "If you play metal or need lower notes, get a 5-string. Otherwise, a 4-string is more than enough for most genres. The extra string adds weight and wider neck which takes adjustment.",
            createdAt: new Date("2024-01-13"),
          },
        ],
      },
      {
        userId: users[2]._id,
        category: categories[0]._id, // Guitar
        title: "Best beginner acoustic guitar under $300?",
        body: "Looking for recommendations for my first acoustic guitar.",
        answered: false,
        answers: [],
      },
    ]);
    console.log("Created questions with answers");

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
