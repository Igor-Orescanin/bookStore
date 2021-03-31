
const mongoose = require('mongoose');
require('dotenv').config()
const url = `mongodb+srv://bookstore_user:${process.env.mongodbPass}@cluster0.j7qvp.mongodb.net/bookstore?retryWrites=true&w=majority`;


mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error',console.error);
mongoose.connection.on('open', () => {
    console.log('Database connection established...');
})


const bookDataSchema = new mongoose.Schema({
    title: String,
    year: Number,
    author: String,
    price: Number,

}, { timestamps: true});
const BookData = mongoose.model('BookData', bookDataSchema)

const addressSchema = new mongoose.Schema({
    zipCode: Number,
    city: String,
    street: String,
    number: Number
})

const userDataSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    password: String,
    address: [addressSchema]
    
},{timestamps: true})
const UserData = mongoose.model('UserData', userDataSchema)



const orderDataSchema = new mongoose.Schema({
    book: String,
    bookId: String,
    qty: Number,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookData'}] 
    
},{timestamps: true})
const OrderData = mongoose.model('OrderData', orderDataSchema)
module.exports = { BookData, UserData, OrderData }

