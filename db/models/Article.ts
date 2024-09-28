import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({

    articleTitle : {
        type: String,
        required: true
    },
    articleImage : {
        type: String,
        required: true
    },
    articleCategory : {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    articleText : {
        type: String,
        required: true
    },



}, {
    timestamps: true
})



export const Article = mongoose.models?.Article || mongoose.model('Article', ArticleSchema)