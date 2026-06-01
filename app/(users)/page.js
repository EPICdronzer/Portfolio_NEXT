import Navbar from "@/components_home/navbar";
import Hero from "@/components_home/hero";
import Services from "@/components_home/services";
import Experience from "@/components_home/experience";
import Portfolio from "@/components_home/portfolio";
import Testimonials from "@/components_home/testimonials";
import Blog from "@/components_home/blog";
import Footer from "@/components_home/footer";

// MongoDB Server Actions
import { getServices } from "@/backend/actions/service";
import { getExperiences } from "@/backend/actions/experience";
import { getPortfolios } from "@/backend/actions/portfolio";
import { getBlogs } from "@/backend/actions/blog";

export const revalidate = 0; // Don't cache - always fetch fresh data

export const metadata = {
  title: "Harsh Vashishth - Creative Portfolio",
  description: "Modern portfolio for Aliza, Fashion Designer.",
};

export default async function Page() {
  // Fetch data in parallel directly from MongoDB on the server
  const [
    servicesRes,
    experiencesRes,
    portfoliosRes,
    blogsRes
  ] = await Promise.all([
    getServices(),
    getExperiences(),
    getPortfolios(),
    getBlogs()
  ]);

  const initialServices = servicesRes?.success ? servicesRes.services : [];
  const initialExperiences = experiencesRes?.success ? experiencesRes.experiences : [];
  const initialPortfolios = portfoliosRes?.success ? portfoliosRes.portfolios : [];
  const initialBlogs = blogsRes?.success ? blogsRes.blogs : [];

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Services initialServices={initialServices} />
      <Experience initialExperiences={initialExperiences} />
      <Portfolio initialPortfolios={initialPortfolios} />
      <Testimonials />
      <Blog initialBlogs={initialBlogs} />
      <Footer />
    </main>
  );
}
