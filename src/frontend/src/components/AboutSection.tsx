import { Award, Globe, Microscope, Package, Shield, Users } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  {
    icon: <Globe size={28} />,
    value: "50+",
    label: "Countries Served",
    desc: "Global distribution network across six continents",
  },
  {
    icon: <Award size={28} />,
    value: "30+",
    label: "Years of Expertise",
    desc: "Decades of innovation in healthcare",
  },
  {
    icon: <Package size={28} />,
    value: "10,000+",
    label: "Products Offered",
    desc: "Comprehensive medical device portfolio",
  },
  {
    icon: <Shield size={28} />,
    value: "ISO 13485",
    label: "Certified Quality",
    desc: "International medical device quality standard",
  },
  {
    icon: <Users size={28} />,
    value: "8,500+",
    label: "Professionals",
    desc: "Expert team spanning the globe",
  },
  {
    icon: <Microscope size={28} />,
    value: "12",
    label: "R&D Centers",
    desc: "Continuous innovation in medical technology",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
              Our Story
            </p>
            <h2 className="section-title text-4xl sm:text-5xl text-foreground mb-6 leading-tight">
              Pioneering Healthcare
              <br />
              <span className="text-primary">Since 1992</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Founded in 1992, Nondon began as a regional pharmaceutical
                distributor and has grown into a multinational leader supplying
                hospitals, clinics, and research institutions worldwide.
              </p>
              <p>
                Today, we operate manufacturing facilities and distribution hubs
                across Europe, Asia, the Americas, and Africa — ensuring
                critical medical supplies reach every corner of the globe with
                speed and reliability.
              </p>
              <p>
                Every product in our portfolio meets or exceeds the strictest
                international regulatory requirements. Our commitment to
                quality, accessibility, and innovation drives everything we do.
              </p>
            </div>

            {/* Certifications row */}
            <div className="flex flex-wrap gap-3 mt-8">
              {["ISO 13485", "CE Mark", "FDA Approved", "WHO Prequalified"].map(
                (cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1.5 border border-primary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-full bg-primary/5"
                  >
                    <Shield size={11} />
                    {cert}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-secondary/60 rounded-2xl p-5 hover:bg-secondary transition-colors duration-200"
              >
                <div className="text-accent mb-3">{stat.icon}</div>
                <div className="font-display font-bold text-2xl text-foreground mb-0.5">
                  {stat.value}
                </div>
                <div className="font-semibold text-sm text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-muted-foreground text-xs leading-relaxed">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
