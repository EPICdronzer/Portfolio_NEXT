import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  category: { type: String, required: true },  // "Development" | "Design" | "Marketing"
  slug:     { type: String, required: true, unique: true },
  title:    { type: String, required: true },
  desc:     { type: String, default: "" },
  iconName: { type: String, default: "code" },

  // Primary image (backward compat)
  image:  { type: String, default: "" },
  // Multiple images — shown on service detail page
  images: [{ type: String }],

  order:  { type: Number, default: 0 },
}, { timestamps: true });

// Force clear cached model in development to prevent Mongoose schema hot-reload cache bugs
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  delete mongoose.models.Service;
}

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
