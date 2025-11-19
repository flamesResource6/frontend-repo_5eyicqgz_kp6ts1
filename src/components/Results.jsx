import { motion } from "framer-motion";

function formatPrice(value, currency) {
  if (value == null) return "-";
  return new Intl.NumberFormat("en", { style: "currency", currency }).format(value);
}

export default function Results({ data, currency }) {
  const items = data?.results || [];
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-blue-100">{items.length} results</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.03 }}
            className="group rounded-2xl overflow-hidden bg-slate-900/60 border border-blue-500/10 hover:border-blue-500/40 backdrop-blur shadow-xl hover:shadow-2xl transition"
          >
            <div className="aspect-video w-full bg-gradient-to-br from-blue-900/40 to-violet-900/30" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white truncate pr-2">{it.title}</h3>
                <span className="text-xs text-blue-300/80 px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">{it.region}</span>
              </div>
              {it.address && <p className="mt-1 text-sm text-blue-200/70 truncate">{it.address}</p>}
              <div className="mt-3 flex items-center justify-between">
                <p className="text-blue-100 font-semibold">
                  {currency === "EUR" ? formatPrice(it.price_eur, "EUR") : formatPrice(it.price_bgn, "BGN")}
                </p>
                <p className="text-blue-300/80 text-sm">{it.size_sqm} sqm</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
