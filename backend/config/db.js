import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("enter your mongodb account here").then(()=>console.log("DB Connected"));
}  


