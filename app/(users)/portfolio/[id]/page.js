import PortfolioHero from "@/components_portfolio/PortfolioHero";
import SinglePortfolioDetail from "@/components_portfolio/SinglePortfolioDetail";
import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";

export const metadata = {
  title: "Portfolio Details | My Portfolio",
  description: "View the details of my portfolio project.",
};

export default function PortfolioItemPage({ params }) {
  // Using params.id allows us to dynamically render content if we pass it down
  // or fetch it within the client component. 
  
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <PortfolioHero />
      <SinglePortfolioDetail />
      <Footer />
    </main>
  );
}
