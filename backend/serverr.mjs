import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import authenticate from './middleware/authenticate.js'; 

dotenv.config();
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET); // Should print "Yashi"

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

 app.use('/api', authRoutes);


app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
 });



const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
