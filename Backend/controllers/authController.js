import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

function createToken(user) {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '2h' } 
  );
}

export async function register(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }
  
  const { fullName, username, email, password, role } = req.body;
  
  if (!fullName || !username || !email || !password || !role) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      required: ['fullName', 'username', 'email', 'password', 'role'] 
    });
  }
  
  try {
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.username === username 
          ? 'Username taken' 
          : 'Email already registered' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      fullName, 
      username, 
      email, 
      password: hashedPassword, 
      role: role.toLowerCase() 
    });
    
    await user.save();
    const token = createToken(user);
    
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id,
        fullName: user.fullName, 
        username: user.username, 
        email: user.email,
        role: user.role 
      } 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      error: 'Registration failed', 
      details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
}

export async function login(req, res) {
  console.log('Login request body:', req.body);
  
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }
  
  const { email, password, role } = req.body; // Changed from username to email
  
  if (!email || !password || !role) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      required: ['email', 'password', 'role'] 
    });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.role !== role.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized for this role' });
    }

    const token = createToken(user);
    res.status(200).json({ 
      token, 
      user: { 
        id: user._id,
        fullName: user.fullName, 
        username: user.username, 
        email: user.email,
        role: user.role 
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      error: 'Login failed', 
      details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
}

export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ 
      error: 'Failed to fetch profile',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
}