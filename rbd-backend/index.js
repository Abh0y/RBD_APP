import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connect from "./config/databse.js"
import userRequest from "./routes/userRequest.js"
import user from "./routes/user.js"
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
connect();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",user);
app.use("/api/userdata", userRequest);


app.listen(PORT,()=>{
  console.log(`Server is running at ${PORT}`)
});