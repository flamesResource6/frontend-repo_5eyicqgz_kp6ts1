import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REGIONS = [
  "Blagoevgrad","Burgas","Dobrich","Gabrovo","Haskovo","Kardzhali","Kyustendil","Lovech","Montana","Pazardzhik","Pernik","Pleven","Plovdiv","Razgrad","Ruse","Shumen","Silistra","Sliven","Smolyan","Sofia City","Sofia Province","Stara Zagora","Targovishte","Varna","Veliko Tarnovo","Vidin","Vratsa","Yambol",
];

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSqm, setMinSqm] = useState("");
  const [maxSqm, setMaxSqm] = useState("");

  const base = import.meta.env.VITE_BACKEND_URL || "";

  const doSearch = async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (region) params.set("region", region);
    if (currency) params.set("price_currency", currency);
    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    if (minSqm) params.set("min_sqm", minSqm);
    if (maxSqm) params.set("max_sqm", maxSqm);
    const res = await fetch(`${base}/api/properties?` + params.toString());
    const data = await res.json();
    onSearch?.(data);
  };

  useEffect(() => {
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative -mt-24 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-[95%] max-w-6xl rounded-2xl bg-slate-900/60 backdrop-blur border border-blue-500/20 p-4 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-2">
            <label className="text-xs text-blue-200/80">Search</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try: sea view, center, new build"
              className="mt-1 w-full rounded-lg bg-slate-800/60 border border-slate-600/40 px-3 py-2 text-blue-50 placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>

          <div>
            <label className="text-xs text-blue-200/80">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 w-full rounded-lg bg-slate-800/60 border border-slate-600/40 px-3 py-2 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            >
              <option value="">All regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-blue-200/80">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 w-full rounded-lg bg-slate-800/60 border border-slate-600/40 px-3 py-2 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            >
              <option>EUR</option>
              <option>BGN</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-blue-200/80">Min price</label>
            <input
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              className="mt-1 w-full rounded-lg bg-slate-800/60 border border-slate-600/40 px-3 py-2 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>
          <div>
            <label className="text-xs text-blue-200/80">Max price</label>
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              type="number"
              className="mt-1 w-full rounded-lg bg-slate-800/60 border border-slate-600/40 px-3 py-2 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>

          <div className="md:col-span-1">
            <label className="text-xs text-blue-200/80">Size (sqm)</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <input
                value={minSqm}
                onChange={(e) => setMinSqm(e.target.value)}
                type="number"
                placeholder="Min"
                className="w-full rounded-lg bg-slate-800/60 border border-slate-600/40 px-2 py-2 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              />
              <input
                value={maxSqm}
                onChange={(e) => setMaxSqm(e.target.value)}
                type="number"
                placeholder="Max"
                className="w-full rounded-lg bg-slate-800/60 border border-slate-600/40 px-2 py-2 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={doSearch}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-2 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition"
          >
            Search
          </button>
        </div>
      </motion.div>
    </div>
  );
}
