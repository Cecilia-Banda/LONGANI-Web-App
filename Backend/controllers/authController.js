import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ROLES = ['admin', 'nurse', 'doctor', 'record-officer'];

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

function sanitizeUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  };
}

// Enhanced validation middleware
export const validateAuthData = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }
  
  const { fullName, email, password, role } = req.body;
  
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      required: ['fullName', 'email', 'password', 'role'] 
    });
  }

  if (!ROLES.includes(role.toLowerCase())) {
    return res.status(400).json({ 
      error: 'Invalid role', 
      validRoles: ROLES 
    });
  }

  next();
};

export async function register(req, res) {
  try {
    const { fullName, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      fullName, 
      email, 
      password: hashedPassword, 
      role: role.toLowerCase() 
    });
    
    await user.save();
    const token = createToken(user);
    
    res.status(201).json({ 
      token, 
      user: sanitizeUser(user)
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password, role } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.role !== role.toLowerCase()) {
      return res.status(403).json({ error: 'Access denied for this role' });
    }

    const token = createToken(user);
    res.status(200).json({ 
      token, 
      user: sanitizeUser(user)
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(sanitizeUser(user));
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

export async function getUserProfile(req, res) {register, login, getProfile}

// This code provides a complete authentication controller with enhanced validation, registration, login, and profile retrieval