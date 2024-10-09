import trackingModel from "../models/trackingModel.js";

const track = async (req, res) => {
  let trackData = req.body;

  try {
    let data = await trackingModel.create(trackData);
    res.status(201).send({ message: "Food Added" });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some problem in getting food" });
  }
};

const foodeaten = async (req, res) => {
  console.log("GET request received"); // Add this line to check if the request reaches here
  const userId = req.params.userid;
  const formattedDate = req.params.date.replace(/-/g, '/');

  console.log("User ID:", userId);
  console.log("Formatted Date Queried:", formattedDate);

  try {
    const foods = await trackingModel.find({ userId: userId, eatenDate: formattedDate });

    if (foods.length === 0) {
      console.log("No food records found for this date.");
      return res.status(404).json({ message: "No food records found." });
    }

    console.log("Foods fetched:", foods);
    res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server error: Unable to fetch data");
  }
};


export const updateDateFormat = async (req, res) => {
  try {
    const trackings = await trackingModel.find();
    trackings.forEach(async (doc) => {
      const parts = doc.eatenDate.split('/');
      if (parts.length === 3) {
        const newDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
        await trackingModel.updateOne(
          { _id: doc._id },
          { $set: { eatenDate: newDate } }
        );
      }
    });
    res.status(200).send("Date format updated");
  } catch (error) {
    res.status(500).send("Error updating date format");
  }
};


export default { track, foodeaten };