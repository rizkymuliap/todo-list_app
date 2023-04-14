const fs = require('fs');

const dirPath = './data';

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const dataPath = './data/todo-list.json';

if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]', 'utf-8');
}

const readToDo = () => {
    const fileToDo = fs.readFileSync(dataPath, 'utf-8');
    const dataToDo = JSON.parse(fileToDo);
    return dataToDo;
}

const cariToDo = (nama) => {
    const dataToDo = readToDo();
    const ToDo = dataToDo.find((ToDo) => ToDo.nama == nama);
    return ToDo;
}

const saveToDo = (dataToDo) => {
    fs.writeFileSync('data/todo-list.json', JSON.stringify(dataToDo));
}

const addToDo = (data) => {
    const dataToDo = readToDo();
    dataToDo.push(data);
    saveToDo(dataToDo);
    
    console.log(dataToDo);
}

const editToDo = (data) => {
    const dataToDo = readToDo();
    const filterData = dataToDo.filter((todo) => todo.nama !== data.old);
    delete data.old;
    filterData.push(data);
    console.log(filterData);
    saveToDo(filterData);
    
}

const  hapusToDo= (nama) => {
    const dataToDo = readToDo();
    
    const filterToDo = dataToDo.filter((todo) => todo.nama != nama);
    console.log(dataToDo);
    saveToDo(filterToDo);
}


module.exports = {readToDo, cariToDo,addToDo, editToDo, hapusToDo};