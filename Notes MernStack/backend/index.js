import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
import noteRoutes from './routes/note.route.js'
dotenv.config({path: './.env'})

const app = express();
const PORT = process.env.PORT || 7083;

app.use(cors({origin: "*"}));
app.use(express.json());



app.use("/api/user",userRoutes);

app.use("/api/note",noteRoutes),

connectDB()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB Connection Failed !!!",error);
    process.exit(1);
})