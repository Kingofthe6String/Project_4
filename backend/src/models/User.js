import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true, // Remove whitespace from both ends of a string
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true, // Ensures email addresses are unique
    lowercase: true, // Converts email to lowercase
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Basic email validation
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, // Prevents password from being returned in queries by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving (for registration)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // Only hash if password was modified
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password (for login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
