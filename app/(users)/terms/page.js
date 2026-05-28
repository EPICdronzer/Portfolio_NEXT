import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import TermsHero from "@/components_terms/TermsHero";
import TermsDetail from "@/components_terms/TermsDetail";

export const metadata = {
  title: "Terms of Service | Harsh Vashishth - Web Developer",
  description:
    "Review the terms and conditions governing the professional portfolio site of Harsh Vashishth.",
};

export default function TermsPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <TermsHero />
      <TermsDetail />
      <Footer />
    </main>
  );
}
