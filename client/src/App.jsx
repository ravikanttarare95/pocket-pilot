import React from "react";
import HeroImg from "./assets/hero-img.png";
import FEATURES from "./configs/features";
import FeaturesCard from "./components/FeaturesCard";
import Button from "./components/Button";

function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-900 font-serif items-center">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center py-8 sm:py-10 px-4 sm:px-6 flex-1">
        <div className="flex justify-center mb-8 sm:mb-12 max-w-[200px] sm:max-w-xs mx-auto">
          <img
            src={HeroImg}
            alt="Money Illustration"
            className="w-full drop-shadow-xl"
          />
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-slate-800 leading-tight"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          Take Control of Your Finances
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 mx-auto leading-relaxed max-w-3xl">
          Pocket Pilot helps you budget smarter, spend wiser, and save more with
          a beautifully simple finance dashboard.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-white to-slate-100 max-w-7xl mx-4 sm:mx-5 rounded-2xl shadow-lg py-8 sm:py-10 my-8 sm:my-10 px-4 sm:px-8 text-center">
        {/* Section Heading */}
        <h3
          className="text-2xl sm:text-3xl md:text-4xl text-cyan-600 font-semibold mb-6 sm:mb-8"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          What Makes Pocket Pilot Different?
        </h3>

        {/* Section Description */}
        <p className="text-slate-600 mx-auto mb-10 sm:mb-14 text-base sm:text-lg md:text-xl leading-relaxed">
          Designed for real people, Pocket Pilot gives you full control of your
          money through simple tools and intelligent features - all in one
          secure place.
        </p>

        {/* Features Flex Layout */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
          {FEATURES.map((feature, idx) => (
            <FeaturesCard feature={feature} key={idx} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-8 sm:py-10 px-4">
        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-slate-800"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          Your Financial Journey Starts Now
        </h3>
        <p className="mx-auto mb-6 sm:mb-10 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
          Join thousands who’ve simplified their personal budgeting with Pocket
          Pilot. No ads. No hidden fees. Just clarity and control.
        </p>
        <Button btnTitle="Start Free" />
      </section>
    </div>
  );
}

export default App;
