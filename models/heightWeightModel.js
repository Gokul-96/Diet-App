import mongoose from "mongoose";

const heightWeightSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    height: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
  {
    versionKey: false,
  }
);

const heightWeightModel = mongoose.model("heightWeight", heightWeightSchema);
export default heightWeightModel;
