import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './routes/admin.routes.js';
import categoryRoutes from './routes/category.routes.js';
import subCaregoryRoutes from './routes/subcategory.routes.js';
import brandRoutes from './routes/brand.routes.js';
import meterialRoutes from './routes/meterial.routes.js';
import reviewRoutes from './routes/review.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import cartRoutes from './routes/cart.routes.js';
import session from 'express-session';

const env = ".dev"
const envPath = ".env" + env
dotenv.config({
    path: envPath
})

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://jewelry-seven.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With' ,'withCredentials']
}));


app.use(session({
   secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
   cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
   }
}));
app.use("/api/v2", adminRoutes);
app.use("/api/v2", categoryRoutes);
app.use("/api/v2", subCaregoryRoutes);
app.use("/api/v2", brandRoutes);
app.use("/api/v2", meterialRoutes);
app.use("/api/v2", reviewRoutes);
app.use("/api/v2", productRoutes);
app.use("/api/v2", orderRoutes);
app.use("/api/v2", cartRoutes);

const db = process.env.MONGODB_URL;

(async () => {
        try {
            await mongoose.connect(db)
            console.log("DB Connected")
        } catch (error) {
            console.log(error)
        }
})()


export default app