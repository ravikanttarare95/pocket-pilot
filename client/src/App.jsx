import React from "react";
import HeroImg from "./assets/hero-img.png";
import FEATURES from "./configs/features";

function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-900 font-serif items-center">
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
        <p className="text-xl text-slate-600 mx-auto leading-relaxed">
          moneyBook helps you budget smarter, spend wiser, and save more with a
          beautifully simple finance dashboard.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-white to-slate-100 max-w-7xl mx-5 rounded-3xl shadow-lg py-10 sm:py-15 my-10 px-5 sm:px-10 mb-15 text-center">
        {/* Section Heading */}
        <h3
          className="text-4xl text-cyan-600 font-semibold mb-8"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          What Makes moneyBook Different?
        </h3>

        {/* Section Description */}
        <p className="text-slate-600 max-w-4xl mx-auto mb-14 text-lg leading-relaxed">
          Designed for real people, moneyBook gives you full control of your
          money through simple tools and intelligent features — all in one
          secure place.
        </p>

        {/* Features Flex Layout */}
        <div className="flex flex-wrap justify-center gap-10">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white max-md:w-full rounded-2xl shadow-md p-5 border-t-4 border-rose-500 w-72 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-transform duration-300"
            >
              <p className="text-slate-800 font-medium text-lg">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-10 sm:py-16 px-4 sm:px-8 w-full">
        <h3
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-800"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          Your Financial Journey Starts Now
        </h3>

        <p className="mx-auto max-w-2xl mb-8 sm:mb-12 text-base sm:text-lg text-slate-600 leading-relaxed">
          Join thousands who’ve simplified their personal budgeting with
          moneyBook. No ads. No hidden fees. Just clarity and control.
        </p>

        <button className="bg-gradient-to-r from-cyan-600 to-rose-600 text-white text-lg sm:text-xl px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg hover:opacity-90 transition transform hover:scale-105 font-semibold">
          Start Free
        </button>
      </section>
    </div>
  );
}
export default App;
