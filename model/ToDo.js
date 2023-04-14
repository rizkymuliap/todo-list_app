const mongoose = require('mongoose');

//Membuat schema
const DATATODO = mongoose.model('ToDo',     {
    nama :{
            type : String,
            required : true
        },
    due_date : String,
    describe : String,
    status : String
})

module.exports = {DATATODO};
