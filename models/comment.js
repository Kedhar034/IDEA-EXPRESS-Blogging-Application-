const { text } = require("express");
const {Schema,model} = require("mongoose");

const commentSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog",
    },

},{timestamps:true});

const comment = new model("comment",commentSchema);

module.exports = comment;