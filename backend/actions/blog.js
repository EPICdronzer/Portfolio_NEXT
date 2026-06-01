"use server";

import { revalidatePath } from "next/cache";
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

    const images = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
    const image  = images[0] || data.image || "/blog_thumbnails.png";

    const blog = await Blog.create({
      slug,
      title:    data.title,
      date:     data.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }),
      category: data.category || "Development",
      author:   data.author   || "Harsh Vashishth",
      readTime: data.readTime || "4 min read",
      image,
      imgPos:   data.imgPos  || "object-center",
      images,
      content:  data.content || "",
      order:    count,
    });
    
    // Clear cache on Vercel
    revalidatePath("/blog");
    revalidatePath("/admin/settings");
    
    return { success: true, blog: serializeBlog(blog) };
  } catch (error) {
    console.error("addBlog error:", error);
    return { success: false, error: error.message };
  }
}

/** Update an existing blog post by _id
 *  imageMode: 'replace' → overwrite images
 *  imageMode: 'append'  → push new images onto existing
 */
export async function updateBlog(id, data) {
  try {
    await connect();

    let updateDoc = {
      ...(data.slug     !== undefined && { slug:     data.slug }),
      ...(data.title    !== undefined && { title:    data.title }),
      ...(data.date     !== undefined && { date:     data.date }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.author   !== undefined && { author:   data.author }),
      ...(data.readTime !== undefined && { readTime: data.readTime }),
      ...(data.imgPos   !== undefined && { imgPos:   data.imgPos }),
      ...(data.content  !== undefined && { content:  data.content }),
      ...(data.order    !== undefined && { order:    data.order }),
    };

    const newImages = Array.isArray(data.images) ? data.images.filter(Boolean) : [];

    if (data.imageMode === "append" && newImages.length > 0) {
      const existing = await Blog.findById(id).select("images image");
      const merged = [...(existing?.images || []), ...newImages];
      updateDoc.images = merged;
      updateDoc.image  = merged[0] || existing?.image || "/blog_thumbnails.png";
    } else if (newImages.length > 0) {
      updateDoc.images = newImages;
      updateDoc.image  = newImages[0];
    }

    const blog = await Blog.findByIdAndUpdate(id, updateDoc, { new: true });
    if (!blog) return { success: false, error: "Blog not found" };
    
    // Clear cache on Vercel
    revalidatePath("/blog");
    revalidatePath("/admin/settings");
    
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
    
    // Clear cache on Vercel
    revalidatePath("/blog");
    revalidatePath("/admin/settings");
    
    return { success: true };
  } catch (error) {
    console.error("deleteBlog error:", error);
    return { success: false, error: error.message };
  }
}

/** Get a blog post by slug or _id */
export async function getBlogBySlugOrId(slugOrId) {
  try {
    await connect();
    let blog = await Blog.findOne({ slug: slugOrId });
    if (!blog && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slugOrId);
    }
    if (!blog) return { success: false, error: "Blog not found" };
    return { success: true, blog: serializeBlog(blog) };
  } catch (error) {
    console.error("getBlogBySlugOrId error:", error);
    return { success: false, error: error.message };
  }
}
