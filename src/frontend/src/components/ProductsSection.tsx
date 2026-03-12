import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsByCategory } from "@/hooks/useQueries";
import { MapPin, MessageSquare, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";

const CATEGORIES = [
  "All",
  "Diagnostic Devices",
  "Surgical Instruments",
  "Monitoring Equipment",
  "Pharmaceuticals",
  "Lab Equipment",
  "Personal Protective Equipment",
];

const CATEGORY_IMAGES: Record<string, string> = {
  "Diagnostic Devices":
    "/assets/generated/product-diagnostic-device.dim_400x300.jpg",
  "Surgical Instruments":
    "/assets/generated/product-surgical-instruments.dim_400x300.jpg",
  "Monitoring Equipment":
    "/assets/generated/product-monitoring-equipment.dim_400x300.jpg",
};

const FALLBACK_COLORS: Record<string, string> = {
  Pharmaceuticals: "from-emerald-900 to-emerald-700",
  "Lab Equipment": "from-violet-900 to-violet-700",
  "Personal Protective Equipment": "from-orange-900 to-orange-700",
};

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "UltraScan Pro 3000",
    category: "Diagnostic Devices",
    description:
      "High-resolution portable ultrasound system with AI-assisted diagnostics for point-of-care imaging.",
    price: 24500,
    currency: "USD",
    region: "Global",
    inStock: true,
  },
  {
    id: 2n,
    name: "SurgEdge Titanium Set",
    category: "Surgical Instruments",
    description:
      "Premium titanium surgical instruments with ergonomic handles, autoclave-safe to 134°C.",
    price: 3800,
    currency: "USD",
    region: "Europe & Americas",
    inStock: true,
  },
  {
    id: 3n,
    name: "VitalTrack ICU Monitor",
    category: "Monitoring Equipment",
    description:
      "12-parameter ICU patient monitor with wireless telemetry, 15-hour battery backup.",
    price: 8900,
    currency: "USD",
    region: "Asia-Pacific",
    inStock: true,
  },
  {
    id: 4n,
    name: "Amoxicillin 500mg (1000 caps)",
    category: "Pharmaceuticals",
    description:
      "Broad-spectrum antibiotic, GMP-certified, WHO prequalified for global procurement.",
    price: 420,
    currency: "USD",
    region: "Africa & Middle East",
    inStock: true,
  },
  {
    id: 5n,
    name: "BioSpec Analyzer Lab Suite",
    category: "Lab Equipment",
    description:
      "Automated hematology and biochemistry analyzer with 120 tests/hour throughput.",
    price: 18700,
    currency: "USD",
    region: "Global",
    inStock: false,
  },
  {
    id: 6n,
    name: "NanoGuard PPE Kit",
    category: "Personal Protective Equipment",
    description:
      "Level 4 protection gown, N99 respirator, and face shield — WHO-compliant pandemic kit.",
    price: 85,
    currency: "USD",
    region: "Global",
    inStock: true,
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const imgSrc = CATEGORY_IMAGES[product.category];
  const fallbackClass =
    FALLBACK_COLORS[product.category] ?? "from-primary to-primary/70";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      data-ocid={`products.item.${index + 1}`}
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-card hover:shadow-xl transition-shadow duration-300 border-border/60 group">
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${fallbackClass} flex items-center justify-center`}
            >
              <Tag size={40} className="text-white/40" />
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                Out of Stock
              </span>
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-semibold">
            {product.category}
          </Badge>
        </div>

        <CardHeader className="pb-2 pt-4">
          <h3 className="font-display font-bold text-base text-foreground leading-tight">
            {product.name}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-3">
            {product.description}
          </p>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <MapPin size={11} />
            <span>{product.region}</span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-0 pb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              From
            </p>
            <p className="font-display font-bold text-lg text-foreground">
              {product.currency} {product.price.toLocaleString()}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold text-xs px-4"
            disabled={!product.inStock}
            data-ocid={`products.inquire.button.${index + 1}`}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <MessageSquare size={12} className="mr-1.5" />
            Inquire
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: backendProducts, isLoading } =
    useGetProductsByCategory(activeCategory);

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : SAMPLE_PRODUCTS.filter(
          (p) => activeCategory === "All" || p.category === activeCategory,
        );

  return (
    <section id="products" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-semibold text-sm tracking-widest uppercase mb-2"
          >
            Our Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-4xl sm:text-5xl text-foreground mb-4"
          >
            Medical Products & Devices
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            10,000+ products across diagnostics, surgery, monitoring, and
            pharmaceuticals — all certified to international standards.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          data-ocid="products.filter.tab"
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-white text-foreground border-border hover:border-primary/50 hover:text-primary"
              }`}
              data-ocid={`products.${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}.tab`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="products.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <div key={k} className="rounded-lg overflow-hidden">
                <Skeleton className="h-44 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20" data-ocid="products.empty_state">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
