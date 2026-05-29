"use server";

import connect from "@/backend/dbconfig/config";
import Settings from "@/backend/models/settings";

/**
 * Gets the current settings. Seeds default values once-only if database is empty.
 */
export async function getSettings() {
  try {
    await connect();
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        username: "admin",
        password: "admin123",
        projectsDone: 50,
        yearsExperience: 3,
        experienceMonths: 0,
        happyClients: 30,
        technologies: 12,
      });
      console.log("Seeded default settings into MongoDB via Server Action");
    }

    const data = settings.toObject();
    // Convert ObjectId to string for safe transfer to Client Components
    data._id = data._id.toString();
    // Remove password to prevent it from going to the client
    delete data.password;

    return { success: true, settings: data };
  } catch (error) {
    console.error("Server Action getSettings error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Updates settings and/or credentials in MongoDB.
 */
export async function updateSettings(settingsData) {
  try {
    await connect();
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    if (settingsData.username !== undefined) settings.username = settingsData.username;
    if (settingsData.password !== undefined && settingsData.password.trim() !== "") {
      settings.password = settingsData.password;
    }
    if (settingsData.projectsDone !== undefined) settings.projectsDone = Number(settingsData.projectsDone);
    if (settingsData.yearsExperience !== undefined) settings.yearsExperience = Number(settingsData.yearsExperience);
    if (settingsData.experienceMonths !== undefined) settings.experienceMonths = Number(settingsData.experienceMonths);
    if (settingsData.happyClients !== undefined) settings.happyClients = Number(settingsData.happyClients);
    if (settingsData.technologies !== undefined) settings.technologies = Number(settingsData.technologies);

    await settings.save();

    const data = settings.toObject();
    data._id = data._id.toString();
    delete data.password;

    return { success: true, settings: data };
  } catch (error) {
    console.error("Server Action updateSettings error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Admin Login Validation Server Action
 */
export async function loginAdmin(username, password) {
  try {
    await connect();

    let settings = await Settings.findOne();
    if (!settings) {
      // Seed default if empty
      settings = await Settings.create({
        username: "admin",
        password: "admin123",
        projectsDone: 50,
        yearsExperience: 3,
        experienceMonths: 0,
        happyClients: 30,
        technologies: 12,
      });
    }

    if (settings.username === username && settings.password === password) {
      return { success: true, message: "Authentication successful" };
    } else {
      return { success: false, error: "Invalid username or password" };
    }
  } catch (error) {
    console.error("Server Action loginAdmin error:", error);
    return { success: false, error: "Database connection failed" };
  }
}
