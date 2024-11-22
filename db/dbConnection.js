import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connecting to the MONGODB database
    const connectionOfInstance = await mongoose.connect(`${process.env.MONGODB_URL}/tasks`);
    console.log(
      `MONGODB CONNECTED: || DB HOST::${connectionOfInstance.connection.host}`
    );
  } catch (error) {
    console.error(`MONGODB ERROR:: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
