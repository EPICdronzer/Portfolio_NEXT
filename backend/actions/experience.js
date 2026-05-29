"use server";

import connect from "@/backend/dbconfig/config";
import Experience from "@/backend/models/experience";

function serializeExp(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  obj._id = obj._id.toString();
  return obj;
}

/** Build the period display string from individual fields */
function buildPeriod(doc) {
  const start = doc.startMonth ? `${doc.startMonth} ${doc.startYear}` : doc.startYear;
  const end   = doc.endMonth   ? `${doc.endMonth} ${doc.endYear}`     : doc.endYear;
  return `${start} - ${end}`;
}

/** Get all experiences sorted by order */
export async function getExperiences() {
  try {
    await connect();
    const experiences = await Experience.find().sort({ order: 1, createdAt: 1 });
    return {
      success: true,
      experiences: experiences.map(e => ({
        ...serializeExp(e),
        period: buildPeriod(e),
      })),
    };
  } catch (error) {
    console.error("getExperiences error:", error);
    return { success: false, error: error.message };
  }
}

/** Add a new experience entry */
export async function addExperience(data) {
  try {
    await connect();
    const count = await Experience.countDocuments();
    const experience = await Experience.create({
      startMonth:   data.startMonth   || "",
      startYear:    data.startYear,
      endMonth:     data.endMonth     || "",
      endYear:      data.endYear,
      role:         data.role,
      company:      data.company,
      companyExtra: data.companyExtra || "",
      href:         data.href         || "#",
      order: count,
    });
    const serialized = serializeExp(experience);
    serialized.period = buildPeriod(experience);
    return { success: true, experience: serialized };
  } catch (error) {
    console.error("addExperience error:", error);
    return { success: false, error: error.message };
  }
}

/** Update an existing experience by _id */
export async function updateExperience(id, data) {
  try {
    await connect();
    const experience = await Experience.findByIdAndUpdate(
      id,
      {
        ...(data.startMonth   !== undefined && { startMonth:   data.startMonth }),
        ...(data.startYear    !== undefined && { startYear:    data.startYear }),
        ...(data.endMonth     !== undefined && { endMonth:     data.endMonth }),
        ...(data.endYear      !== undefined && { endYear:      data.endYear }),
        ...(data.role         !== undefined && { role:         data.role }),
        ...(data.company      !== undefined && { company:      data.company }),
        ...(data.companyExtra !== undefined && { companyExtra: data.companyExtra }),
        ...(data.href         !== undefined && { href:         data.href }),
        ...(data.order        !== undefined && { order:        data.order }),
      },
      { new: true }
    );
    if (!experience) return { success: false, error: "Experience not found" };
    const serialized = serializeExp(experience);
    serialized.period = buildPeriod(experience);
    return { success: true, experience: serialized };
  } catch (error) {
    console.error("updateExperience error:", error);
    return { success: false, error: error.message };
  }
}

/** Delete an experience by _id */
export async function deleteExperience(id) {
  try {
    await connect();
    await Experience.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("deleteExperience error:", error);
    return { success: false, error: error.message };
  }
}
