const mongoose = require('mongoose');
const {DATATODO} = require('../model/ToDo')
mongoose.connect('mongodb+srv://perdanarizkymulia162:@RizkyMul16203@rizkymulia.f5eqgpp.mongodb.net/test',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

//Membuat object
// const ToDo1 = new toDo({
//     nama : "PRG",
// }) 

// //Simpan ke Collectin
// ToDo1.save().then((ToDo) => console.log(ToDo));
