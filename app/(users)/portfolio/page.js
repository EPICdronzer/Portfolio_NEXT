import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import PortfolioHero from "@/components_portfolio/PortfolioHero";
import PortfolioDetail from "@/components_portfolio/PortfolioDetail";
import { getPortfolios } from "@/backend/actions/portfolio";

export const revalidate = 0; // Don't cache - always fetch fresh data

export const metadata = {
  title: "Portfolio | Harsh Vashishth - Web Developer",
  description:
    "Explore the portfolio of Harsh Vashishth featuring premium web apps, WordPress themes, SaaS templates, and UI/UX design deliverables.",
};

export default async function PortfolioPage() {
  const res = await getPortfolios();
  const portfolios = res?.success ? res.portfolios : [];

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <PortfolioHero />
      <PortfolioDetail initialPortfolios={portfolios} />
      <Footer />
    </main>
  );
}
