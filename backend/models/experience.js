import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  // Period display string — can be year range "2015 - 2016" or month/year like "Jan 2022 - Mar 2023"
  startMonth: { type: String, default: "" },   // e.g. "Jan" or ""
  startYear:  { type: String, required: true }, // e.g. "2015"
  endMonth:   { type: String, default: "" },   // e.g. "Mar" or ""
  endYear:    { type: String, required: true }, // e.g. "2016" or "Present"
  role:       { type: String, required: true },
  company:    { type: String, required: true },
  companyExtra: { type: String, default: "" }, // e.g. "(Remote)"
  // Website link shown as "Go to website"
  href: { type: String, default: "#" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
