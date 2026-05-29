import mongoose from "mongoose";
import { siteConfig } from "@/app/config";
import dns from "dns";

// ─── Force Google DNS for MongoDB Atlas SRV lookups ────────────────────────
// The MongoDB driver calls dns.resolveSrv() and dns.resolveTxt() internally.
// On some ISPs/networks, the default DNS refuses SRV queries.
// We create a dedicated resolver using Google/Cloudflare DNS and
// monkey-patch the global dns functions so the driver uses them.
const googleResolver = new dns.Resolver();
googleResolver.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1"]);

// Patch the functions the MongoDB driver actually calls
dns.resolveSrv = (hostname, callback) => googleResolver.resolveSrv(hostname, callback);
dns.resolveTxt = (hostname, callback) => googleResolver.resolveTxt(hostname, callback);
dns.resolve = (...args) => googleResolver.resolve(...args);
dns.resolve4 = (hostname, ...rest) => googleResolver.resolve4(hostname, ...rest);
dns.resolve6 = (hostname, ...rest) => googleResolver.resolve6(hostname, ...rest);
// Also set the default servers for anything else
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

export default async function connect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(siteConfig.mongodb.uri, {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ Connected to MongoDB Atlas (portfolio database)");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        throw error;
    }
}