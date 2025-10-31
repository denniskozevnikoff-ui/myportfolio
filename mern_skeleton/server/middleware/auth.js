import jwt from 'jsonwebtoken'
const SECRET = process.env.JWT_SECRET || 'secret123'

export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: 'No token provided' })

  const token = header.split(' ')[1]
  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
