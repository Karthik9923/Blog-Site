import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connected"))
.catch(err => {
    console.error(err.message);
    process.exit(1); 
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(process.env.PORT || 8001, () => {
    console.log(`Server is running on port ${process.env.PORT || 8001}`);
});
