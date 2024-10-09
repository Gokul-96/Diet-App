import mongoose from "mongoose";  

const trackingSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "foods", required: true },
    details: {
        calories: Number,
        protein: Number,
        carbohydrate: Number,
        fat: Number,
        fibre: Number,
    },
    eatenDate: {
        type: String,
        default: () => {
            let date = new Date();
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        },
    },
    quantity: { type: Number, min: 1, required: true },
}, {
    timestamps: true,
    versionKey: false,
});

const trackingModel = mongoose.model("trackings", trackingSchema); 

export default trackingModel;  
