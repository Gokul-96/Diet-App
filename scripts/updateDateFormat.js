import mongoose from "mongoose";
import trackingModel from "./models/trackingModel.js"; // Adjust the path as needed

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDatabaseName", { useNewUrlParser: true, useUnifiedTopology: true });

async function updateDateFormat() {
  try {
    let trackings = await trackingModel.find();
    trackings.forEach(async (doc) => {
      let parts = doc.eatenDate.split('/');
      if (parts.length === 3) {
        // Assume that current format is DD/MM/YYYY and convert to MM/DD/YYYY
        let newDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
        await trackingModel.updateOne(
          { _id: doc._id },
          { $set: { eatenDate: newDate } }
        );
      }
    });
    console.log("Date format updated for all documents");
  } catch (error) {
    console.error("Error updating date format:", error);
  }
}

updateDateFormat();
