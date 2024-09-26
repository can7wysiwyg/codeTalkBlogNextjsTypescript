import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({

    catName: {
        type: String,
        required: true,
        unique: true
    }


}, {
    timestamps: true
})


export const Category =  mongoose.models?.Category || mongoose.model('Category', CategorySchema)