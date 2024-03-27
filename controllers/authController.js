const Joi= require('joi');
const bycrypt= require('bcrypt');
const {User}= require('../models/user');

const login = async(req,res, next)=>{
     const {error} = validate(req.body);
   
    if(error) return res.status(422).send('ERROR');
    
    const user= await User.findOne({email: req.body.email}).exec();
    if(!user) return res.status(404).send('invalid email or password');
    console.log(user)

    const validPasswords= await bycrypt.compare(req.body.password, user.password);
    if(!validPasswords) return res.status(404).send('invalid email or password');

    const token= user.generateAuthToken();
    res.send(token);
    
}

const validate= (req)=>{
     try{
          const schema= Joi.object({
               email: Joi.string().min(5).max(255).required().email(),
               password: Joi.string().min(5).max(255).required()
          })

          //Joi.validate(req, schema);
          return schema.validate({email:req.email, password:req.password});
     }catch(e) {
          return e
     }
}

module.exports={
     login
}