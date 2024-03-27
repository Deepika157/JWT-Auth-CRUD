'use strict';

const mongoose= require('mongoose');
const winston= require('winston');

module.exports=()=>{
    mongoose.connect('mongodb://localhost/LibDB')
    .then(()=> winston.info('Mongodb connected'));

}