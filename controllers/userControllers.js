const bycrypt= require('bcrypt');
const _= require('lodash');
const {User, validate}= require('../models/user');

const addUser = async (req, res, next)=> {
    console.log(req.body)

    const{error}= validate(req.body);

    if(error) return res.status(422).send('ERROR OCCURED');

    let user= await User.findOne({email: req.body.email}).exec();
    if(user) return res.status(400).send('user with this email aready exists');
     
    user=  new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt= await bycrypt.genSalt(10);
    user.password= await bycrypt.hash(req.body.password, salt);
    (await user).save();
    const token= user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

}

module.exports={
    addUser
}

