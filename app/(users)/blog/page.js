import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import BlogHero from "@/components_blog/BlogHero";
import BlogDetail from "@/components_blog/BlogDetail";
import { getBlogs } from "@/backend/actions/blog";

export const revalidate = 0; // Don't cache - always fetch fresh data

export const metadata = {
  title: "Blog | Harsh Vashishth - Web Developer",
  description:
    "Read the latest technology blogs, tutorials, and full-stack development articles written by Harsh Vashishth.",
};

export default async function BlogPage() {
  const res = await getBlogs();
  const blogs = res?.success ? res.blogs : [];

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <BlogHero />
      <BlogDetail initialBlogs={blogs} />
      <Footer />
    </main>
  );
}
