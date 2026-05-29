"use server";

import connect from "@/backend/dbconfig/config";
import Message from "@/backend/models/messages";

function serializeMessage(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  obj._id = obj._id.toString();
  // Format date for display
  obj.date = obj.createdAt
    ? new Date(obj.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" })
    : "";
  return obj;
}

/** Get all messages, newest first */
export async function getMessages() {
  try {
    await connect();
    const messages = await Message.find().sort({ createdAt: -1 });
    return { success: true, messages: messages.map(serializeMessage) };
  } catch (error) {
    console.error("getMessages error:", error);
    return { success: false, error: error.message };
  }
}

/** Submit a contact form message (public) */
export async function submitMessage(data) {
  try {
    await connect();
    const message = await Message.create({
      name:    data.name,
      email:   data.email,
      phone:   data.phone   || "",
      subject: data.subject || "",
      message: data.message,
    });
    return { success: true, message: serializeMessage(message) };
  } catch (error) {
    console.error("submitMessage error:", error);
    return { success: false, error: error.message };
  }
}

/** Toggle read/unread status of a message */
export async function toggleMessageRead(id) {
  try {
    await connect();
    const msg = await Message.findById(id);
    if (!msg) return { success: false, error: "Message not found" };
    msg.read = !msg.read;
    await msg.save();
    return { success: true, message: serializeMessage(msg) };
  } catch (error) {
    console.error("toggleMessageRead error:", error);
    return { success: false, error: error.message };
  }
}

/** Delete a message by _id */
export async function deleteMessage(id) {
  try {
    await connect();
    await Message.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("deleteMessage error:", error);
    return { success: false, error: error.message };
  }
}
