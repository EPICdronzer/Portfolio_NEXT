import PortfolioHero from "@/components_portfolio/PortfolioHero";
import SinglePortfolioDetail from "@/components_portfolio/SinglePortfolioDetail";
import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import { getPortfolioBySlugOrId } from "@/backend/actions/portfolio";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const res = await getPortfolioBySlugOrId(id);
  const title = res?.success && res.portfolio?.title ? res.portfolio.title : "Portfolio Project";
  return {
    title: `${title} | Harsh Vashishth Portfolio`,
    description: `View the details of the project: ${title}`,
  };
}

export default async function PortfolioItemPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const res = await getPortfolioBySlugOrId(id);
  const initialPortfolio = res?.success ? res.portfolio : null;

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <PortfolioHero />
      <SinglePortfolioDetail initialPortfolio={initialPortfolio} />
      <Footer />
    </main>
  );
}
