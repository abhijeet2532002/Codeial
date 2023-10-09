const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pratice2');

const database = mongoose.connection;
database.on('error',console.error.bind('Something went wrong'));
database.once('open',function(){
    console.log('Connection establish successfully')
});