const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        minLength:3,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

//we need a collection
const User = mongoose.model("User",userSchema);

module.exports = User;