import { Globe, Heart, Shield } from "lucide-react";
import { SiFacebook, SiLinkedin, SiX, SiYoutube } from "react-icons/si";
import NondonWordmark from "./NondonWordmark";

const currentYear = new Date().getFullYear();

const FOOTER_LINKS = {
  Company: ["About Us", "Leadership", "Careers", "News & Press"],
  Products: [
    "Diagnostic Devices",
    "Surgical Instruments",
    "Monitoring Equipment",
    "Pharmaceuticals",
  ],
  Services: [
    "Global Distribution",
    "Quality Assurance",
    "Regulatory Compliance",
    "Technical Support",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Regulatory Notices",
  ],
};

export default function Footer() {
  return (
    <footer className="gradient-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <NondonWordmark variant="light" className="text-2xl" />
            <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
              Advancing global healthcare through precision medicine and
              reliable medical device supply.
            </p>
            {/* Social links */}
            <div className="flex gap-3 pt-1">
              {[
                {
                  icon: <SiLinkedin size={15} />,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                { icon: <SiX size={15} />, href: "https://x.com", label: "X" },
                {
                  icon: <SiFacebook size={15} />,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: <SiYoutube size={15} />,
                  href: "https://youtube.com",
                  label: "YouTube",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white/50 mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-white/70 text-sm cursor-default">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications bar */}
        <div className="border-t border-white/10 pt-8 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {[
              { icon: <Shield size={13} />, text: "ISO 13485 Certified" },
              { icon: <Shield size={13} />, text: "CE Mark" },
              { icon: <Shield size={13} />, text: "FDA Approved" },
              { icon: <Globe size={13} />, text: "WHO Prequalified" },
              { icon: <Shield size={13} />, text: "GMP Compliant" },
            ].map((cert) => (
              <div
                key={cert.text}
                className="flex items-center gap-1.5 text-white/50 text-xs border border-white/15 px-3 py-1.5 rounded-full"
              >
                <span className="text-accent">{cert.icon}</span>
                {cert.text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {currentYear} Nondon Pharmaceuticals & Medical Devices. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart size={11} className="text-accent mx-0.5" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
