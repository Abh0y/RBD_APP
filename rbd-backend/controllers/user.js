import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res)=> {
  try {
    const {name,email,password,role} = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({name,email,password : hashedPassword ,role})
    await newUser.save()
    return res.status(201).json({message : "User registered successfuly!"})
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });  
  }

}

export const loginUser = async (req,res) =>{
    try {
      const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email ,role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res.cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        user,
        token,
        message: `User Login Success`,
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0), 
    httpOnly: true,       
    sameSite: 'Strict',  
  });

  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};