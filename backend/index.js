import express from 'express';
import mongoose from 'mongoose';
import { authRouter } from './routes/authRoutes';
import { userRouter } from './routes/userRoutes';
import { roomRouter } from './routes/roomRoutes';
import { permissionRouter } from './routes/permissionRoutes';

async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connected");
    } catch (error) {
        console.log(error.message)
    }
}

connectDB();

const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/permissions", permissionRouter)

app.listen(PORT, ()=> {
    console.log(`server running at port ${PORT}`);
})