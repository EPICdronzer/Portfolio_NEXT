import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import ServiceHero from "@/components_service/ServiceHero";
import ServiceDetail from "@/components_service/ServiceDetail";
import { getServices } from "@/backend/actions/service";

export const metadata = {
  title: "Services | Harsh Vashishth - Web Developer",
  description:
    "Explore the professional services offered by Harsh Vashishth including Web Development, UI/UX Design, and Digital Marketing.",
};

export default async function ServicePage() {
  const res = await getServices();
  const services = res?.success ? res.services : [];

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <ServiceHero />
      <ServiceDetail initialServices={services} />
      <Footer />
    </main>
  );
}
