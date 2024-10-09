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
  let userid = req.params.userid;
  let date = new Date(req.params.date);
  let strDate =
  (date.getMonth() + 1) + "/" +  date.getDate()    + "/" + date.getFullYear();
console.log(strDate)
  try {
    let foods = await trackingModel
      .find({ userId: userid, eatenDate: strDate })
      .populate("userId")
      .populate("foodId");

    res.send(foods);
    console.log(foods)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some problem in getting food" });
  }
};

export default { track, foodeaten };
