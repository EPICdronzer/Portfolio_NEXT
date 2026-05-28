import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import PrivacyHero from "@/components_privacy/PrivacyHero";
import PrivacyDetail from "@/components_privacy/PrivacyDetail";

export const metadata = {
  title: "Privacy Policy | Harsh Vashishth - Web Developer",
  description:
    "Learn about how Harsh Vashishth respects, handles, and protects your personal data on this portfolio site.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <PrivacyHero />
      <PrivacyDetail />
      <Footer />
    </main>
  );
}
