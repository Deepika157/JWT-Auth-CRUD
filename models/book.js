const mongoose= require('mongoose');
const Joi= require('joi');

const bookSchema= new mongoose.Schema({
    title:{
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true
    },
    shortDescription:{
        type: String,
        minLength: 20,
        maxLength: 200,
        required: true
    },
    longDescription:{
        type: String,
        minLength: 50,
        maxLength: 1000,
        required: true
    },
    author:{
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    inStock:{
        type: Boolean,
        required: true,
        default: true
    }
});

const Book= mongoose.model('Book', bookSchema);

const validateBook= (book)=>{
    try{
    const schema=Joi.object({
        title: Joi.string().min(5).max(50).required(),
        shortDescription: Joi.string().min(20).max(200).required(),
        longDescription: Joi.string().min(50).max(1000).required(),
        author: Joi.string().min(5).max(50).required(),
        price: Joi.number().required(),
        inStock: Joi.boolean().required()

    })
    return Joi.validate(book, schema);
}
catch(e){
    return e;
}
}

exports.Book= Book;
exports.validate= validateBook;