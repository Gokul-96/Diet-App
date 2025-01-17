import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbohydrate: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    fibre: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
  {
    versionKey: false,
  }
);

const foodModel = mongoose.model("foods", foodSchema);

export default foodModel;
