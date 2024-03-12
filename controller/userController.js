const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, 
      role: req.body.role
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error:"Authentication failed"});
        }
        const passwordMatch= await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({error:"Authentication failed"});

        }

        const token =jwt.sign({userId: user.id},username,{
            expiresIn:"1h",
        });
        res.status(200).json({token});
    }catch(error){
        res.status(500).json({error:"Login failed"});
    }
};

exports.logout = (req, res) => {

    res.clearCookie('jwt');
  
    res.status(200).json({ message: 'Logout successful' });
}

