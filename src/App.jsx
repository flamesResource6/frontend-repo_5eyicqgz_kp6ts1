import { useState } from "react";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";

function App() {
  const [data, setData] = useState({ results: [], total: 0 });
  const [currency, setCurrency] = useState("EUR");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Hero />
      <SearchBar onSearch={(d) => { setData(d); setCurrency((prev) => d?.results?.[0]?.currency || prev); }} />
      <Results data={data} currency={currency} />
      <footer className="py-10 text-center text-blue-300/70">Built with a smooth, futuristic aesthetic for effortless property discovery.</footer>
    </div>
  );
}

export default App;
