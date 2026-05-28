import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import ContactHero from "@/components_contact/ContactHero";
import ContactDetail from "@/components_contact/ContactDetail";

export const metadata = {
  title: "Contact | Harsh Vashishth - Web Developer",
  description:
    "Contact Harsh Vashishth for web app developments, full-stack applications, and custom design projects.",
};

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <ContactHero />
      <ContactDetail />
      <Footer />
    </main>
  );
}
