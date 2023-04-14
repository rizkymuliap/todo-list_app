const fs = require('fs');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {body, validationResult, check} = require('express-validator');
const {readToDo, cariToDo, addToDo, editToDo,  hapusToDo} = require('./utils/todo');


require('./utils/connection');

const {DATATODO} = require('./model/ToDo')
const app = express();

app.set('view engine', 'ejs')
app.use(expressLayouts);
app.use(express.urlencoded({extended : true}));


//Halaman Utama
app.get('/', async(req,res) => {


    listDataToDo = await DATATODO.find()
    // DATATODO.find().then((todo) => {
    //     res.send(todo);
    // })
    // // const dataToDo = readToDo();
    
     res.render('index', {
         layout : 'layouts/main-layout.ejs',
         title : 'Halaman Home',
         listDataToDo
    })
})

//Halaman Detail
app.get('/detail/:nama',async(req,res) => {
    const ToDo = await DATATODO.findOne({nama : req.params.nama})//MENGUNAKAN MONGODB
    //const ToDo = cariToDo(req.params.id); FILE PROCESSING
    if(!ToDo){
        res.send('<h1>404 not_FOUND!</h1> ');
        res.status(404);
        
    }else{
            if(ToDo.status != 'Selesai'){
            res.render('detail', {
                layout : 'layouts/main-layout.ejs',
                title : 'Halaman detail',
                ToDo
            })
            }else{
                res.redirect('/');
            }
    }
})

//Halaman Tambah Data
app.get('/tambah/add', (req, res) => {
    
    res.render('tambah',{
        title: 'Tambah To Do List',
        layout : 'layouts/main-layout.ejs'
    })
})

app.post('/tambah', (req,res)=>{
    DATATODO.insertMany(req.body);
    console.log(req.body);
    res.redirect('/');
   // addToDo(req.body); MENGGUNAKAN FILE PROCESSING
 
})

app.get('/edit/:nama', async (req,res)=> {
    const todo = await DATATODO.findOne({nama : req.params.nama});
   if(todo.status != "Selesai"){
    res.render('edit',{
        title : 'Form Edit ToDo',
        layout : 'layouts/main-layout.ejs',
        todo,
    })
    }else{
        res.redirect('/')
    }
})

app.post('/edit', async (req,res)=>{
    console.log(req.body.old);
    const deleteTodo = await DATATODO.findOneAndUpdate({nama : req.body.old},{nama : req.body.nama, due_date : req.body.due_date, describe : req.body.describe});
    
    ///editToDo(req.body);
    res.redirect('/')
})

app.get('/hapus/:nama', async(req,res) => {
    const listTodo = await DATATODO.findOne({nama : req.params.nama});
    const deleteTodo = await DATATODO.deleteOne({_id : listTodo._id});

   // hapusToDo(req.params.nama); MENGGUNAKAN FILE PROCESSING
    res.redirect('/')
})

app.post('/selesaikan/:nama', async (req,res) => {
    const listTodo = await DATATODO.findOneAndUpdate({nama : req.params.nama},{status : 'Selesai'});
    res.redirect('/');
    
})


app.listen(3000, (req, res)=>{
    console.log('Running in port 3000');
})
