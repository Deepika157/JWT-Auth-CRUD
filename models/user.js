const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const config= require('config');
const Joi= require('joi');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 50,  
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
});

userSchema.methods.generateAuthToken= function(){
    const token= jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}
const User= mongoose.model('User', userSchema);



const validateUser=(user)=>{
    try{
        const schema= Joi.object({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(1024).required()
        })
        const value = schema.validate({name: user.name, email:user.email, password:user.password});
        console.log('::::USER VLAIDATIO::::::::::')
        console.log(value)
        return value
    }catch(e){
        console.log(':::::::::ERROR::::::::::::')
        console.log(e)
        return e
    }
}
exports.User= User;
exports.validate= validateUser;
