import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connect = () =>{
  mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(() => console.log('Connected to DATABASE'))
  .catch((err) => console.error('Failed to connect to DATABASE', err));
}
export default connect;