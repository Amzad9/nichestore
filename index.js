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
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))


app.use("/api/v2", adminRoutes);
app.use("/api/v2", categoryRoutes);
app.use("/api/v2", subCaregoryRoutes);
app.use("/api/v2", brandRoutes);
app.use("/api/v2", meterialRoutes);
app.use("/api/v2", reviewRoutes);
app.use("/api/v2", productRoutes);
app.use("/api/v2", orderRoutes);


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