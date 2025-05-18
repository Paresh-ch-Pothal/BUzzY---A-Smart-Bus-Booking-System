import mongoose from 'mongoose'

const addedBusSchema = new mongoose.Schema({
    busId:{
       type : mongoose.Schema.Types.ObjectId,
       ref : 'bus' 
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
})

const addedBus = mongoose.model('addedBus', addedBusSchema)
module.exports=addedBus