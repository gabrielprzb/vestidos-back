const mongoose = require('mongoose');
const URL_MONGO = "mongodb+srv://cyn2903:1234567.@cluster0-iqsf0.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(URL_MONGO,{ useNewUrlParser:true },(err) => {
    if(!err){ 
        console.log('Conexión exitosa en MongoDB')
    }else{
        console.log(err)
    };
    
});

const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: String,
    profilePicture: String,
    rating: Number,
    city: String,
    cp: Number,
    email: String,
    password: String

},{ timestamps:true });

const dressSchema = new Schema({

  
    picture: String,
    size: String,
    type: String, //coctel, etiquite, etc
    color: String,
    brand: String,
    description: String,
    availability: {type: Boolean, default: false},
    price: Number,
    warranty: Number //Por si se daña


},{ timestamps:true });


const orderSchema = new Schema({

    dress: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dress'
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    returnDate: Date,
    getDate: Date

},{ timestamps: true });

const User = mongoose.model( 'User', userSchema);
const Dress = mongoose.model( 'Dress', dressSchema);
const Order = mongoose.model( 'Order', orderSchema);

module.exports = {
    User,
    Dress,
    Order
}
