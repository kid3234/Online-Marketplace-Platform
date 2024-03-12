const jwt = require('jsonwebtoken')


exports.authenticate = (req,res,next)=>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({error:"No token provided"});
    }

    try{
        const decode = jwt.verify(token,proccess.env.JWT_SECRET );
        req.userId = decode.userId;
        req.role = decode.role;
        next();
    }catch(error){
        console.error('Error authenticating token:', error);
    res.status(401).json({ error: 'Invalid token' });
    }
};

exports.auhorize = (roles)=>(req,res,next)=>{
    if(!roles.includes(req.role)){
        return res.status(403).json({error:"Unauthorized"});
    }
    next()
};