import NoneDashboardLayout from "@/components/NoneDashboardLayout";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="nondashboard-layout">
            <NoneDashboardLayout />

            <main className="nondashboard-layout__main">
                {children}
            </main>
            <Footer />
        </div>
    );
}
