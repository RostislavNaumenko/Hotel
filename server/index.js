import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";

//Data imports
import User from './models/User.js';
import { dataUser, dataRoom, dataRoomStat, dataDailyPlan } from './data/index.js';
import Room from "./models/Room.js";
import RoomStat from "./models/RoomStat.js";
import DailyPlan from "./models/DailyPlan.js"


// Configuration 

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());

// Routes

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);



//Mongoose setup

const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    /*ONLY ADD DATA ONE TIME */
    // Room.insertMany(dataRoom);
    //RoomStat.insertMany(dataRoomStat);
    //User.insertMany(dataUser);
    //DailyPlan.insertMany(dataDailyPlan);
   
  })
  .catch((error) => console.log(`${error} did not connect`));

