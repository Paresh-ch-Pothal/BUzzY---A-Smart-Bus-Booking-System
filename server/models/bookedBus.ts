import mongoose from 'mongoose'

const bookedBusSchema = new mongoose.Schema({
    busId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bus',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    seat:{
        type: Number,
        required : true
    },
    paymentDetails:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'payment'
    }

},{
    timestamps: true
})

const bookedBus = mongoose.model('bookedBus', bookedBusSchema)
module.exports = bookedBus