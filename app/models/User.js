import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

// Prevent model recompilation in development
export default mongoose.models.User || mongoose.model("User", UserSchema);