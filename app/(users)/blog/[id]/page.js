import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import BlogHero from "@/components_blog/BlogHero";
import SingleBlogDetail from "@/components_blog/SingleBlogDetail";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const formattedId = id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedId} | Harsh Vashishth Blog`,
    description: `Read the latest articles about ${formattedId} on Harsh Vashishth's engineering blog.`,
  };
}

export default async function BlogDynamicPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <BlogHero />
      <SingleBlogDetail postId={id} />
      <Footer />
    </main>
  );
}
