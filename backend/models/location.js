const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deviceModel = require('./device');


const locationSchema = new mongoose.Schema({
    Name: {
        type:String,
        required: true,
    },

    Address: {
        type:String,
    },

    Phone: {
        type:String,
    },

    Devices:[{
        type: Schema.Types.ObjectId,
        ref: 'device'
     
      }]
});

const locationModel = mongoose.model("locationModel",locationSchema)
module.exports = locationModel;