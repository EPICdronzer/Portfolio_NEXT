import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import ServiceHero from "@/components_service/ServiceHero";
import SingleServiceDetail from "@/components_service/SingleServiceDetail";
import { getServiceBySlugOrId, getServices } from "@/backend/actions/service";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const res = await getServiceBySlugOrId(id);
  const title = res?.success ? res.service.title : id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return {
    title: `${title} Service | Harsh Vashishth`,
    description: `Learn more about the premium ${title} services offered by Harsh Vashishth.`,
  };
}

export default async function ServiceDynamicPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const [serviceRes, servicesRes] = await Promise.all([
    getServiceBySlugOrId(id),
    getServices(),
  ]);

  const initialService = serviceRes?.success ? serviceRes.service : null;
  const initialAllServices = servicesRes?.success ? servicesRes.services : [];

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <ServiceHero />
      <SingleServiceDetail 
        serviceId={id} 
        initialService={initialService} 
        initialAllServices={initialAllServices} 
      />
      <Footer />
    </main>
  );
}
