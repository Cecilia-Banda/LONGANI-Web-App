import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

function createToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });
}

export async function register(req, res) {
  const { fullName, username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username taken' });

    const user = new User({ fullName, username, email, password, role });
    await user.save();
    const token = createToken(user);
    res.status(201).json({ token, user: { fullName, username, role } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = createToken(user);
    res.status(200).json({ token, user: { fullName: user.fullName, username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
}

export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user: { fullName: user.fullName, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile', details: err.message });
  }
}
export default { register, login, getUserProfile };