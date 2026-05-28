import Navbar from "@/components_home/navbar";
import Hero from "@/components_home/hero";
import Services from "@/components_home/services";
import Experience from "@/components_home/experience";
import Portfolio from "@/components_home/portfolio";
import Testimonials from "@/components_home/testimonials";
import Blog from "@/components_home/blog";
import Footer from "@/components_home/footer";

export const metadata = {
  title: "Harsh Vashishth - Creative Portfolio",
  description: "Modern portfolio for Aliza, Fashion Designer.",
};

export default function Page() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Experience />
      <Portfolio />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}
