import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import BlogHero from "@/components_blog/BlogHero";
import SingleBlogDetail from "@/components_blog/SingleBlogDetail";
import { getBlogBySlugOrId } from "@/backend/actions/blog";
import { getServices } from "@/backend/actions/service";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const res = await getBlogBySlugOrId(id);
  const title = res?.success && res.blog?.title ? res.blog.title : "Blog Post";
  return {
    title: `${title} | Harsh Vashishth Blog`,
    description: `Read the latest article: ${title} on Harsh Vashishth's engineering blog.`,
  };
}

export default async function BlogDynamicPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Fetch blog post and all services concurrently on the server
  const [blogRes, servicesRes] = await Promise.all([
    getBlogBySlugOrId(id),
    getServices(),
  ]);

  const initialBlog = blogRes?.success ? blogRes.blog : null;
  const initialAllServices = servicesRes?.success ? servicesRes.services : [];

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <BlogHero />
      <SingleBlogDetail
        initialBlog={initialBlog}
        initialAllServices={initialAllServices}
      />
      <Footer />
    </main>
  );
}
