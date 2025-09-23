import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Rocketblast:VanHalen1!@cluster0.4elk9qo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongoDB connection successful");
  } catch (error) {
    console.error("error connecting to mongoDB", error);
  }
};
