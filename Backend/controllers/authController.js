import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

function createToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2hr' });
}

export async function register(req, res) {

  
  // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }
  
  const { fullName, username, email, password, role } = req.body;
  
  // Validate required fields
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      required: ['fullName', 'username', 'email', 'password'] 
    });
  }
  
  try {
    // Check for existing user by username OR email
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.username === username ? 'Username taken' : 'Email already registered' 
      });
    }

    const user = new User({ fullName, username, email, password, role });
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
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
}

export async function login(req, res) {
  // Add debugging
  console.log('Login request body:', req.body);
  
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }
  
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      required: ['username', 'password', 'role'] 
    });
  }
  
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

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
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
}

export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ 
      user: { 
        id: user._id,
        fullName: user.fullName, 
        username: user.username, 
        email: user.email,
        role: user.role 
      } 
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch user profile', details: err.message });
  }
}
