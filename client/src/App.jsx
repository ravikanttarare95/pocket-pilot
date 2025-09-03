import React from "react";
import HeroImg from "./assets/hero-img.png";
import FEATURES from "./configs/features";

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

      {/* Features Section */}
      <section className="bg-gradient-to-br from-white to-slate-100 max-w-7xl mx-auto rounded-3xl shadow-lg py-10 my-10 px-8 mb-24 text-center">
        {/* Section Heading */}
        <h3
          className="text-4xl text-cyan-600 font-semibold mb-8"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          What Makes moneyBook Different?
        </h3>

        {/* Section Description */}
        <p className="text-slate-600 max-w-4xl mx-auto mb-14 text-xl leading-relaxed">
          Designed for real people, moneyBook gives you full control of your
          money through simple tools and intelligent features — all in one
          secure place.
        </p>

        {/* Features Flex Layout */}
        <div className="flex flex-wrap justify-center gap-10">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-5 border-t-4 border-rose-500 w-90 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-transform duration-300"
            >
              <p className="text-slate-800 font-medium text-lg">{feature}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default App;
