import express from 'express';
import dotenv from 'dotenv';

import photoRoutes from "./routes/servicePhotoRouter";



import { connectDB } from './config/db';



const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());

app.use("/services", photoRoutes);


async function startServer() {
  await connectDB(); // first check DB
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
