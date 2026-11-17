const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Username or Password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Username or Password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    res.json({ message: 'Login Successful', token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, password, confirmPassword, department, rollNo, phone, collegeEmail } = req.body;

    console.log('Signup attempt:', { username, department, rollNo, phone, collegeEmail, fileExists: !!req.file });

    if (!username || !password || !confirmPassword || !department || !rollNo || !phone || !collegeEmail) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!collegeEmail.endsWith('@kongu.edu')) {
      return res.status(400).json({ message: 'Invalid college email - must end with @kongu.edu' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'ID Card upload required' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { collegeEmail }, { rollNo }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      password,
      collegeEmail,
      department,
      rollNo,
      phone,
      idCard: req.file.originalname,
      idCardData: req.file.buffer,
      idCardMimeType: req.file.mimetype
    });

    await user.save();
    console.log('User created:', user._id);
    res.status(201).json({ message: 'Signup Successful', userId: user._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id).select('-password -idCardData');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      collegeEmail: user.collegeEmail,
      department: user.department,
      rollNo: user.rollNo,
      phone: user.phone,
      idCard: user.idCard,
      idCardUrl: `/api/auth/idcard/${user._id}`,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getIdCard = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user || !user.idCardData) {
      return res.status(404).json({ message: 'ID Card not found' });
    }

    res.set('Content-Type', user.idCardMimeType);
    res.send(user.idCardData);
  } catch (error) {
    console.error('Get ID card error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};