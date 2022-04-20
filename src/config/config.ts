import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const uri = process.env.URI as string;

const connectDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connection Successfull");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connect(uri).then().catch();

const config = {
  PORT,
  connectDatabase,
};

export default config;
