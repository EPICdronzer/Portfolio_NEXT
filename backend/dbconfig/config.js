import mongoose from "mongoose";
import { siteConfig } from "@/app/config";
import dns from "dns";

// Override ISP/local DNS with Google DNS so MongoDB Atlas SRV records resolve correctly.
// This fixes: querySrv ECONNREFUSED _mongodb._tcp.cluster0...
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

export default async function connect(){
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try{
        await mongoose.connect(siteConfig.mongodb.uri, {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ Connected to MongoDB Atlas (portfolio database)");
    }catch(error){
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
}