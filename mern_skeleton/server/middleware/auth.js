// server/middleware/auth.js
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'secret123';

export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return res.status(401).json({ message: 'No token provided' });

  const parts = header.split(' ');
  const token = parts.length === 2 && parts[1] ? parts[1] : parts[0];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, SECRET);
    // attach decoded payload to req.user (id, role, iat, exp)
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Admin-only middleware
export const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin role required' });
  next();
};
