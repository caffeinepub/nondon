import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import NondonWordmark from "./NondonWordmark";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-nav" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 py-3">
        {/* Logo wordmark */}
        <a href="#home" className="flex-shrink-0" data-ocid="nav.link">
          <NondonWordmark
            variant={scrolled ? "dark" : "light"}
            className="text-2xl"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link text-sm font-semibold tracking-wide ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-5 rounded-full"
            data-ocid="nav.contact.primary_button"
          >
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`md:hidden p-2 rounded-md transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-border shadow-nav"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-foreground hover:text-accent hover:bg-secondary rounded-lg transition-colors"
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                type="button"
                className="mt-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold"
                data-ocid="nav.mobile.contact.primary_button"
                onClick={() => {
                  setMobileOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
