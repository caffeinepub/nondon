import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Globe, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/assets/generated/nondon-hero-bg.dim_1920x1080.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-10 gradient-navy opacity-90" />
      {/* Decorative grid */}
      <div
        className="absolute inset-0 z-10 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <Globe size={13} />
            Trusted in 50+ Countries Worldwide
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
          >
            Advancing <span className="text-accent">Global</span>
            <br />
            Healthcare
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            <span
              className="font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.18 195) 0%, oklch(0.65 0.22 210) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nondon
            </span>{" "}
            delivers world-class pharmaceutical products and precision medical
            devices to healthcare systems across six continents. 30+ years of
            innovation, quality, and trust.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-full px-8 text-base"
              data-ocid="hero.primary_button"
            >
              <a href="#products">
                Explore Products
                <ArrowRight size={16} className="ml-2" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full px-8 text-base font-semibold"
              data-ocid="hero.secondary_button"
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-6"
          >
            {[
              { icon: <Shield size={15} />, text: "ISO 13485 Certified" },
              { icon: <Award size={15} />, text: "FDA Approved" },
              { icon: <Globe size={15} />, text: "CE Mark" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-white/70 text-sm"
              >
                <span className="text-accent">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
