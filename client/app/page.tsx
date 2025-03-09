import NoneDashboardLayout from "@/components/NoneDashboardLayout";
import Landing from "./(nondashboard)/landing/page";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NoneDashboardLayout />
      
      <main className="nondashboard-layout__main">
        <Landing/>
      </main>
      <Footer />
    </div>
  );
}
