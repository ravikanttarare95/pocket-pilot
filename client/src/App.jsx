import React from "react";
import HeroImg from "./assets/hero-img.png";

function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-900 font-serif">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center py-10 px-6 flex-1">
        <div className="flex justify-center mb-12 max-w-xs mx-auto">
          <img
            src={HeroImg}
            alt="Money Illustration"
            className="w-full drop-shadow-xl"
          />
        </div>
        <h2
          className="text-5xl font-bold mb-6 text-slate-800 leading-tight"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          Take Control of Your Finances
        </h2>
        <p className="text-2xl text-slate-600 mx-auto leading-relaxed">
          moneyBook helps you budget smarter, spend wiser, and save more with a
          beautifully simple finance dashboard.
        </p>
      </section>
    </div>
  );
}
export default App;
