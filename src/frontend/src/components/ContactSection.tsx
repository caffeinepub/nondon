import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@/hooks/useQueries";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending, isError } = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(form);
      setSubmitted(true);
    } catch {
      // handled by isError
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-semibold text-sm tracking-widest uppercase mb-2"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-4xl sm:text-5xl text-foreground mb-4"
          >
            Request a Product Inquiry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Our regional specialists will respond within one business day.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-secondary/50 rounded-2xl p-6">
              <h3 className="font-display font-bold text-lg text-foreground mb-5">
                Global Offices
              </h3>
              <div className="space-y-4">
                {[
                  {
                    city: "London (HQ)",
                    address: "45 Harley Street, London W1G 8QR",
                    country: "United Kingdom",
                  },
                  {
                    city: "New York",
                    address: "1230 Avenue of the Americas, NY 10020",
                    country: "United States",
                  },
                  {
                    city: "Singapore",
                    address: "1 Raffles Quay, #40-01, Singapore 048583",
                    country: "Singapore",
                  },
                ].map((office) => (
                  <div key={office.city} className="flex gap-3">
                    <MapPin
                      size={16}
                      className="text-accent mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {office.city}
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {office.address}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {office.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:inquiry@nondon.com"
                className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={15} className="text-primary" />
                </div>
                inquiry@nondon.com
              </a>
              <a
                href="tel:+442071234567"
                className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone size={15} className="text-primary" />
                </div>
                +44 207 123 4567
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full py-16 text-center bg-secondary/30 rounded-2xl"
                data-ocid="contact.success_state"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <CheckCircle2 size={36} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Inquiry Submitted!
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thank you for reaching out. A Nondon specialist will contact
                  you within one business day.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", company: "", message: "" });
                  }}
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-secondary/30 rounded-2xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Dr. Jane Smith"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      className="bg-white rounded-lg"
                      data-ocid="contact.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@hospital.org"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      className="bg-white rounded-lg"
                      data-ocid="contact.email.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-sm font-semibold">
                    Company / Institution *
                  </Label>
                  <Input
                    id="company"
                    placeholder="General Hospital — Procurement Dept."
                    value={form.company}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, company: e.target.value }))
                    }
                    required
                    className="bg-white rounded-lg"
                    data-ocid="contact.company.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm font-semibold">
                    Message / Product Requirements *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe the products you are interested in, quantities, target region, and any regulatory requirements..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    rows={5}
                    className="bg-white rounded-lg resize-none"
                    data-ocid="contact.message.textarea"
                  />
                </div>

                {isError && (
                  <p
                    className="text-destructive text-sm"
                    data-ocid="contact.error_state"
                  >
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold"
                  data-ocid="contact.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" /> Submit Inquiry
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
