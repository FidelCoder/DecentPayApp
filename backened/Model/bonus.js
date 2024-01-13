const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bonusSchema = new Schema({

    name:{
        type: String,
        required:true,
    },   
    address:{
        type: String,
        required: true,
    },
    amount:{
    type: Number,
    }
})


module.exports = mongoose.model("Bonus",bonusSchema);