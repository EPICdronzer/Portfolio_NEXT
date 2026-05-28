import Navbar from "@/components_home/navbar";
import Footer from "@/components_home/footer";
import ServiceHero from "@/components_service/ServiceHero";
import SingleServiceDetail from "@/components_service/SingleServiceDetail";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const formattedId = id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedId} Service | Harsh Vashishth`,
    description: `Learn more about the premium ${formattedId} services offered by Harsh Vashishth.`,
  };
}

export default async function ServiceDynamicPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <ServiceHero />
      <SingleServiceDetail serviceId={id} />
      <Footer />
    </main>
  );
}
