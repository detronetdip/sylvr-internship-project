import {connect} from 'mongoose';
export const connectToMongo=async()=>{
  try {
    const {MONGODB_URL}=process.env;
    await connect(MONGODB_URL||"");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Could not connect to MongoDB");
    throw error;
  }
}
