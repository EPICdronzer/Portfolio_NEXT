import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import PortfolioHero from "@/components_portfolio/PortfolioHero";
import PortfolioDetail from "@/components_portfolio/PortfolioDetail";

export const metadata = {
  title: "Portfolio | Harsh Vashishth - Web Developer",
  description:
    "Explore the portfolio of Harsh Vashishth featuring premium web apps, WordPress themes, SaaS templates, and UI/UX design deliverables.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <PortfolioHero />
      <PortfolioDetail />
      <Footer />
    </main>
  );
}
