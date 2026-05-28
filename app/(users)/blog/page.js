import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import BlogHero from "@/components_blog/BlogHero";
import BlogDetail from "@/components_blog/BlogDetail";

export const metadata = {
  title: "Blog | Harsh Vashishth - Web Developer",
  description:
    "Read the latest technology blogs, tutorials, and full-stack development articles written by Harsh Vashishth.",
};

export default function BlogPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <BlogHero />
      <BlogDetail />
      <Footer />
    </main>
  );
}
