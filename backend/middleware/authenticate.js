
    import jwt from 'jsonwebtoken';
    import dotenv from 'dotenv';

    dotenv.config();
    const JWT_SECRET = process.env.JWT_SECRET;

    const authenticate =(req, res, next)=> {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'Token missing' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
    }

export default authenticate;
