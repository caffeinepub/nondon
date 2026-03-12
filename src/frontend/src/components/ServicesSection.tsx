import { useGetServices } from "@/hooks/useQueries";
import {
  CheckCircle,
  FileCheck,
  GraduationCap,
  Headphones,
  Settings,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import type { Service } from "../backend.d";

const FALLBACK_SERVICES: Service[] = [
  {
    name: "Global Distribution",
    description:
      "Cold-chain logistics and last-mile delivery to 50+ countries. 48-hour emergency fulfillment for critical medical supplies.",
  },
  {
    name: "Quality Assurance",
    description:
      "Rigorous multi-stage QA processes, batch traceability, and real-time monitoring ensure every product meets ISO 13485 standards.",
  },
  {
    name: "Regulatory Compliance",
    description:
      "Expert guidance on CE Mark, FDA 510(k), and regional approvals. We manage compliance so you can focus on patient care.",
  },
  {
    name: "Technical Support",
    description:
      "24/7 multilingual technical helpdesk, on-site engineers, and remote diagnostics for all Nondon devices and instruments.",
  },
  {
    name: "Custom Solutions",
    description:
      "Bespoke procurement, custom labeling, and OEM manufacturing partnerships tailored to your institution's specific requirements.",
  },
  {
    name: "Training & Certification",
    description:
      "Comprehensive operator and biomedical engineer training programs, both on-site and via our e-learning platform.",
  },
];

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Global Distribution": <Truck size={28} />,
  "Quality Assurance": <CheckCircle size={28} />,
  "Regulatory Compliance": <FileCheck size={28} />,
  "Technical Support": <Headphones size={28} />,
  "Custom Solutions": <Settings size={28} />,
  "Training & Certification": <GraduationCap size={28} />,
};

const GRADIENT_CLASSES = [
  "from-blue-600 to-blue-800",
  "from-teal-600 to-teal-800",
  "from-indigo-600 to-indigo-800",
  "from-cyan-600 to-cyan-800",
  "from-sky-600 to-sky-800",
  "from-violet-600 to-violet-800",
];

export default function ServicesSection() {
  const { data: backendServices } = useGetServices();
  const services =
    backendServices && backendServices.length > 0
      ? backendServices
      : FALLBACK_SERVICES;

  return (
    <section
      id="services"
      className="py-24 gradient-navy relative overflow-hidden"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-semibold text-sm tracking-widest uppercase mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-4xl sm:text-5xl text-white mb-4"
          >
            End-to-End Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            From procurement to post-sale support, Nondon is your complete
            healthcare supply partner across the entire value chain.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${GRADIENT_CLASSES[i % GRADIENT_CLASSES.length]} text-white mb-5 shadow-lg`}
              >
                {SERVICE_ICONS[service.name] ?? <Settings size={28} />}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {service.name}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
