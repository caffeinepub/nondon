import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductsSection from "./components/ProductsSection";
import ServicesSection from "./components/ServicesSection";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background font-body">
        <Navbar />
        <main>
          <HeroSection />
          <ProductsSection />
          <AboutSection />
          <ServicesSection />
          <ContactSection />
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </QueryClientProvider>
  );
}
