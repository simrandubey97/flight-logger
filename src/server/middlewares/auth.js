const User=require('./../models/user');

let authorize =(req,res,next)=>{
    var token = req.headers['token'];
    User.findByToken(token,(err,user)=>{
        if(err){
            throw err;
        }
        if(!user) {
            return res.status(400).json({
                error :true,
                message: 'No user found'
            });   
        }
        req.token= token;
        req.user=user;
        next();

    })
}

module.exports={authorize};