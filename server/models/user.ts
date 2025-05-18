import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user','admin']
    },
    bookedBus:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bookedBus'
        }
    ],
    addedBus:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'addedBus'

        }
    ]
},{
    timestamps: true
})

const User = mongoose.model('user',UserSchema)
module.exports = User