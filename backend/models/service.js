import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  // Which tab this service belongs to on the frontend
  category: { type: String, enum: ["Development", "Design", "Marketing"], default: "Development" },
  // Unique slug used in href="/service/[id]"
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  // Optional icon name / SVG string – stored so admin can pick or type a label
  iconName: { type: String, default: "code" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
