import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', urlRoutes);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  } catch (err) {
    // still use apiLogger—not console—but we need env var access:
    const { apiLogger } = await import('./middlewares/apiLogger.js');
    await apiLogger('backend', 'fatal', 'db', err.message);
    process.exit(1);
  }
}

start();
