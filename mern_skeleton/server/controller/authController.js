// server/controller/authController.js
import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret123';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// POST /api/auth/register
export const register = async (req, res) => {
  // try {
  //   const { name, email, password, role } = req.body;
  //   if (!name || !email || !password) {
  //     return res.status(400).json({ message: 'All fields required' });
  //   }

  //   const existing = await User.findOne({ email });
  //   if (existing) return res.status(400).json({ message: 'Email already exists' });

  //   const hashed = await bcrypt.hash(password, 10);
  //   const user = await User.create({ name, email, password: hashed, role: role || 'user' });

  //   // generate token
  //   const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: EXPIRES_IN });

  //   res.status(201).json({ message: 'User registered successfully', token, user: user.toJSON() });
  // } catch (err) {
  //   res.status(500).json({ message: 'Server error', error: err.message });
  // }

 try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already used" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// POST /api/auth/signin
export const signin = async (req, res) => {
  // try {
  //   const { email, password } = req.body;
  //   if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  //   const user = await User.findOne({ email });
  //   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  //   const valid = await bcrypt.compare(password, user.password);
  //   if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  //   const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: EXPIRES_IN });

  //   res.json({ message: 'Signin successful', token, user: user.toJSON() });
  // } catch (err) {
  //   res.status(500).json({ message: 'Server error', error: err.message });
  // }

 try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Signin successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// GET /api/auth/signout
export const signout = async (req, res) => {
  // Token invalidation/blacklist is out of scope here — client should delete token.
  res.json({ message: 'Signout: client should delete token' });
};

// GET /api/auth/profile (protected)
export const profile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
