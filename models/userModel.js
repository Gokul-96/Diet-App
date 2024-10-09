import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,

      min: 12,
    },
  },
  { timestamps: true },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
