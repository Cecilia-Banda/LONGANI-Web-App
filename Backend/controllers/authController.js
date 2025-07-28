import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ROLES = ['admin', 'Nurse', 'Doctor', 'Record Officer'];

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
  // Convert backend role format to frontend format
  const roleReverseMap = {
    'admin': 'admin',
    'Nurse': 'nurse',
    'Doctor': 'doctor', 
    'Record Officer': 'record-officer'
  };

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: roleReverseMap[user.role] || user.role
  };
}

// Registration validation middleware
export const validateRegisterData = (req, res, next) => {
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

  // Convert frontend role to match User model format
  const roleMap = {
    'admin': 'admin',
    'nurse': 'Nurse', 
    'doctor': 'Doctor',
    'record-officer': 'Record Officer',
    'record officer': 'Record Officer'
  };
  
  const normalizedRole = role.toLowerCase().replace(/\s+/g, '-');
  if (!roleMap[role.toLowerCase()] && !roleMap[normalizedRole]) {
    return res.status(400).json({ 
      error: 'Invalid role', 
      validRoles: Object.keys(roleMap),
      receivedRole: role,
      normalizedRole: normalizedRole
    });
  }

  next();
};

// Login validation middleware
export const validateLoginData = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }
  
  const { email, password, role } = req.body;
  
  if (!email || !password || !role) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      required: ['email', 'password', 'role'] 
    });
  }

  // Convert frontend role to match User model format
  const roleMap = {
    'admin': 'admin',
    'nurse': 'Nurse', 
    'doctor': 'Doctor',
    'record-officer': 'Record Officer',
    'record officer': 'Record Officer'
  };
  
  const normalizedRole = role.toLowerCase().replace(/\s+/g, '-');
  if (!roleMap[role.toLowerCase()] && !roleMap[normalizedRole]) {
    return res.status(400).json({ 
      error: 'Invalid role', 
      validRoles: Object.keys(roleMap),
      receivedRole: role,
      normalizedRole: normalizedRole
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

    // Convert frontend role to User model format
    const roleMap = {
      'admin': 'admin',
      'nurse': 'Nurse', 
      'doctor': 'Doctor',
      'record-officer': 'Record Officer',
      'record officer': 'Record Officer'
    };
    
    // Generate username from email (part before @)
    let username = email.split('@')[0];
    
    // Ensure username uniqueness by adding a number if needed
    let counter = 1;
    let originalUsername = username;
    while (await User.findOne({ username })) {
      username = `${originalUsername}${counter}`;
      counter++;
    }
    
    const user = new User({ 
      fullName, 
      username,
      email, 
      password, // Don't hash here - let the pre-save hook handle it
      role: roleMap[role.toLowerCase()] || roleMap[role.toLowerCase().replace(/\s+/g, '-')]
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
    
    console.log('🔍 LOGIN DEBUG:', { email, role });
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('👤 Found user:', { id: user._id, email: user.email, role: user.role });
    console.log('🔐 Password debug:', { 
      inputPassword: password, 
      hashedPassword: user.password ? 'exists' : 'missing',
      passwordLength: user.password ? user.password.length : 'N/A'
    });

    const isMatch = await user.comparePassword(password);
    console.log('🔐 Password comparison result:', isMatch);
    
    // Test with direct bcrypt comparison as well
    const directMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Direct bcrypt comparison:', directMatch);
    
    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Convert frontend role to User model format for comparison
    const roleMap = {
      'admin': 'admin',
      'nurse': 'Nurse', 
      'doctor': 'Doctor',
      'record-officer': 'Record Officer',
      'record officer': 'Record Officer'
    };

    const expectedRole = roleMap[role.toLowerCase()] || roleMap[role.toLowerCase().replace(/\s+/g, '-')];
    console.log('🎭 Role comparison:', { 
      userRole: user.role, 
      frontendRole: role, 
      expectedRole,
      match: user.role === expectedRole 
    });

    if (user.role !== expectedRole) {
      console.log('❌ Role mismatch');
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