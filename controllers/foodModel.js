import foodModel from "../models/foodModel.js";

const create = async (req, res) => {
  try {
    const { name, imageUrl, calories, protein, carbohydrate, fat, fibre } =
      req.body;

    const newFoodItem = new foodModel({
      name: String(name),
      imageUrl: String(imageUrl),
      calories: Number(calories),
      protein: Number(protein),
      carbohydrate: Number(carbohydrate),
      fat: Number(fat),
      fibre: Number(fibre),
    });
    console.log(newFoodItem);

    await newFoodItem.save();

    res
      .status(201)
      .json({ message: "Food item created successfully", data: newFoodItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllFood = async (req, res) => {
  try {
    let foods = await foodModel.find();
    res.send(foods);
  } catch (error) {
    console.log(err);
    res.status(500).send({ message: "Some problem in getting information" });
  }
};

const deletefood = async (req, res) => {
  try {
    let foodId = req.params.id;
    let user = await foodModel.findById(foodId);
    if (user) {
      await foodModel.deleteOne({ _id: foodId });
      res.status(200).send({
        message: "Food Deleted Successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid Food Item",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

//     try {
//         // Extract the food item id from the request parameters
//         let userid = req.params.userid;
//         console.log(userid)

//         // Use the foodModel to find and delete the food item by id
//         const deletedFood = await foodModel.findByIdAndDelete(userid);

//         if (!deletedFood) {
//             return res.status(404).send({ message: 'Food item not found' });
//         }

//         // Send a success response
//         res.status(200).send({ message: 'Food item deleted successfully', deletedFood });
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// };

const foodname = async (req, res) => {
  try {
    let foods = await foodModel.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (foods.length !== 0) {
      res.send(foods);
    } else {
      res.status(404).send({ message: "Food Item Not Fund" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Some Problem in getting the food" });
  }
};

export default {
  create,
  getAllFood,
  deletefood,
  foodname,
};
