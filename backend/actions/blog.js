"use server";

import connect from "@/backend/dbconfig/config";
import Blog from "@/backend/models/blog";

function serializeBlog(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  obj._id = obj._id.toString();
  return obj;
}

/** Get all blog posts sorted by order */
export async function getBlogs() {
  try {
    await connect();
    const blogs = await Blog.find().sort({ order: 1, createdAt: -1 });
    return { success: true, blogs: blogs.map(serializeBlog) };
  } catch (error) {
    console.error("getBlogs error:", error);
    return { success: false, error: error.message };
  }
}

/** Add a new blog post */
export async function addBlog(data) {
  try {
    await connect();
    const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const count = await Blog.countDocuments();
    const blog = await Blog.create({
      slug,
      title:   data.title,
      date:    data.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }),
      image:   data.image   || "/blog_thumbnails.png",
      imgPos:  data.imgPos  || "object-center",
      content: data.content || "",
      order:   count,
    });
    return { success: true, blog: serializeBlog(blog) };
  } catch (error) {
    console.error("addBlog error:", error);
    return { success: false, error: error.message };
  }
}

/** Update an existing blog post by _id */
export async function updateBlog(id, data) {
  try {
    await connect();
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        ...(data.slug    !== undefined && { slug:    data.slug }),
        ...(data.title   !== undefined && { title:   data.title }),
        ...(data.date    !== undefined && { date:    data.date }),
        ...(data.image   !== undefined && { image:   data.image }),
        ...(data.imgPos  !== undefined && { imgPos:  data.imgPos }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.order   !== undefined && { order:   data.order }),
      },
      { new: true }
    );
    if (!blog) return { success: false, error: "Blog not found" };
    return { success: true, blog: serializeBlog(blog) };
  } catch (error) {
    console.error("updateBlog error:", error);
    return { success: false, error: error.message };
  }
}

/** Delete a blog post by _id */
export async function deleteBlog(id) {
  try {
    await connect();
    await Blog.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("deleteBlog error:", error);
    return { success: false, error: error.message };
  }
}
