import mongoose from 'mongoose'

const BusSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    busNo:{
        type: String,
        required: true
    },
    Ac_NonACtype:{
        type: String,
        enum: ['Ac','NON_AC']
    },
    source : {
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    noOfSeats:{
        type: Number,
        required: true
    },
    noOfSleeper:{
        type: Number,
    },
    noOfSeater:{
        type: Number,
    },
    SleeperPrice:{
        type: Number,
    },
    SeaterPrice:{
        type: Number
    },
    addedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    arrivalTime:{
        type: Date
    },
    departureTime:{
        type : Date
    },
    bookedSeats:[
        {
            seat : {
                type : Number,
            },
            userId:{
                type : mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            paymentDetails:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'payment'
            }
        }
    ]
},{
    timestamps: true
})