const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const deviceSchema = new mongoose.Schema({
     
    serialNumber: {
        type:String,
        required: true,
        unique: true,
    },

    type: {
        type:String,
        enum: ['pos', 'kiosk', 'signage'],
        required: true,
    },

    image: {
        type:String,
        required:true,
    },

    status: {

        type:String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    location: {
        type: Schema.Types.ObjectId,
        ref: 'location'
    },

})

const device = mongoose.model('device', deviceSchema);
module.exports = device;
