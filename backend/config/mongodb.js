import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
  mongoose.connection.on('connected',()=>{
    console.log("DB connected")
  });
    try {
      console.log("Attempting to connect...");
      await mongoose.connect("mongodb+srv://bhavik85746:pefa74Ol6F26P5dJ@cluster0.8rpbk.mongodb.net/myDatabase");
      
    } catch (error) {
      console.error("Connection Error:", error);
    }
  }; 




export default connectDB;
