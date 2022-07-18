const mongoose = require('mongoose');

const adressSchema = new mongoose.Schema({
    city: String,
    street: String,
    number: Number,
});
const meeting = new mongoose.Schema({
    date: String,
    weight: String,
});

const userSchema = new mongoose.Schema({
    id : {
        type: String,
        required : true,
        minlength : 4
    },
    firstName : {
        type : String,
        // minlength : 2,
        required : true
    },
    lastName : {
        type : String,
        // minlength : 2,
        maxlength : 20,
        required : true
    },
    address: {city:String,street:String,number:String},
    phone:{
        type : String,
        unique : true,
        // minlength :9,
        maxlength :10
    },
    email : {
        type: String,
        required : true,
        unique : true,
    } ,
    hight :{
        type : String,
    },
    meetings : [{  date: String,
        weight: String}]
});
   
    
   
   
//     lastVisit : {
//         type: Date,
//         default : new Date()
//     }
// }, {timestamps : true,'toJSON': {virtuals: true}  });

// userSchema.virtual('orders', {
//     ref : 'order',
//     localField : '_id',
//     foreignField : 'userId'
// });
//userSchema.set('toJSON',{ virtual: true } );

module.exports = mongoose.model('user', userSchema);