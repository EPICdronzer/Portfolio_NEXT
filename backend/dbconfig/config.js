import mongoose from "mongoose";
import { siteConfig } from "@/app/config";

export default function connect(){
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try{
        mongoose.connect(siteConfig.mongodb.uri)
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("MongoDB connection error:", error);
    }
}