import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  username: { type: String, default: "admin" },
  password: { type: String, default: "admin123" },
  projectsDone: { type: Number, default: 50 },
  yearsExperience: { type: Number, default: 3 },
  experienceMonths: { type: Number, default: 0 },
  happyClients: { type: Number, default: 30 },
  technologies: { type: Number, default: 12 },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
