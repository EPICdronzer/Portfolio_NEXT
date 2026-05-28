import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import AboutHero from "@/components_about/AboutHero";
import AboutSection from "@/components_about/AboutSection";

export const metadata = {
  title: "About | Harsh Vashishth - Web Developer",
  description:
    "Learn more about Harsh Vashishth — a full-stack web developer specializing in MERN stack, Next.js, Java and Python.",
};

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <AboutHero />
      <AboutSection />
      <Footer />
    </main>
  );
}
