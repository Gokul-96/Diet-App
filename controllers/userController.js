import heightWeightModel from "../models/heightWeightModel.js";

export const calculateBMI = (height, weight) => {
  if (!height || !weight) {
    throw new Error("Height and weight must be provided");
  }
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Height and weight must be numbers");
  }
  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be positive values");
  }

  height = height / 100;

  const bmi = weight / Math.pow(height, 2);
  return parseFloat(bmi.toFixed(2));
};

export const determineBMICategory = (bmi) => {
  let bmiCategory;
  if (bmi < 18.5) {
    bmiCategory = "Underweight";
  } else if (bmi >= 18.5 && bmi <= 25) {
    bmiCategory = "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiCategory = "Overweight";
  } else {
    bmiCategory = "Obese";
  }
  return bmiCategory;
};

export const suggestNutritionalIntake = (bmiCategory) => {
  let nutritionalIntakeSuggestion;
  switch (bmiCategory) {
    case "Underweight":
      nutritionalIntakeSuggestion =
        "Consider increasing your calorie and nutrient intake to reach a healthy weight.";
      break;
    case "Normal weight":
      nutritionalIntakeSuggestion =
        "Maintain a balanced diet with adequate calorie and nutrient intake.";
      break;
    case "Overweight":
      nutritionalIntakeSuggestion =
        "Focus on portion control and incorporate more fruits, vegetables, and lean protein into your diet.";
      break;
    case "Obese":
      nutritionalIntakeSuggestion =
        "Seek guidance from a healthcare professional for personalized dietary recommendations and weight management.";
      break;
    default:
      nutritionalIntakeSuggestion = "Invalid BMI category";
  }
  return nutritionalIntakeSuggestion;
};

export const calculateBMIController = async (req, res) => {
  try {
    const { userId, height: heightStr, weight: weightStr } = req.body;

    const height = parseFloat(heightStr);
    const weight = parseFloat(weightStr);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      return res.status(400).json({ message: "Invalid height or weight" });
    }

    const heightWeightEntry = new heightWeightModel({
      userId,
      height,
      weight,
    });
    await heightWeightEntry.save();

    const bmi = calculateBMI(height, weight);

    const bmiCategory = determineBMICategory(bmi);

    const nutritionalIntakeSuggestion = suggestNutritionalIntake(bmiCategory);

    res.status(200).json({
      message: "Successful",
      bmi,
      bmiCategory,
      nutritionalIntakeSuggestion,
    });
    console.log(bmi, bmiCategory, nutritionalIntakeSuggestion);
  } catch (error) {
    console.error("Error calculating BMI:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
