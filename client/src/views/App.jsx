import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AosInitializer from "../components/AosInitializer";
import HeroImg from "./../assets/hero-img.png";
import FEATURES from "../configs/features";
import FeaturesCard from "../components/FeaturesCard";
import Button from "../components/Button";
import Navbar from "./../components/Navbar";
import { getloggedInUser } from "./../utils";
import Footer from "./../components/Footer";
import ServerNoticeBanner from "./../components/ServerNoticeBanner";
import { TAG_LINES } from "./../configs/taglines";
import axios from "axios";

function App() {
  const [user, setUser] = useState(getloggedInUser() || null);
  const navigate = useNavigate();
  const [taglineIndex, setTaglineIndex] = useState(0);

  const fetchHealth = async () => {
    try {
      const healthResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/health`
      );
      if (healthResponse) {
        console.log(healthResponse?.data?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % TAG_LINES.length);
    }, 3000);

    return () => clearInterval(interval); // cleanup IMP
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-slate-900 font-serif ">
      <AosInitializer />
      <Navbar />

      <section className="max-w-7xl mx-auto text-center py-8 sm:py-10 px-4 sm:px-6 flex-1">
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="flex justify-center mb-8 sm:mb-12 max-w-[200px] sm:max-w-xs mx-auto"
        >
          <img
            src={HeroImg}
            alt="Money Illustration"
            className="w-full drop-shadow-xl"
          />
        </div>
        <h2
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          className="text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          {TAG_LINES[taglineIndex]}
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="800"
          className="text-base sm:text-lg md:text-xl text-slate-700 mx-auto leading-relaxed max-w-3xl"
        >
          Pocket Pilot helps you budget smarter, spend wiser, and save more with
          a beautifully simple finance dashboard.
        </p>
      </section>
      <ServerNoticeBanner />
      <section className="">
        <div className="mx-auto bg-gradient-to-br from-white to-white-100 max-w-7xl rounded-2xl shadow-lg py-8 sm:py-10 my-8 sm:my-10 px-4 sm:px-8 text-center">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl text-cyan-600 font-semibold mb-6 sm:mb-8"
            style={{ fontFamily: '"Cormorant Upright", cursive' }}
          >
            What Makes Pocket Pilot Different?
          </h3>

          <p className="text-slate-700 mx-auto mb-10 sm:mb-14 text-base sm:text-lg md:text-xl leading-relaxed">
            Designed for real people, Pocket Pilot gives you full control of
            your money through simple tools and intelligent features - all in
            one secure place.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
            {FEATURES.map(
              ({ featureText, featureIcon: FeatureIcon, colorObj }, idx) => (
                <div key={idx} data-aos="zoom-in">
                  <FeaturesCard
                    colorObj={colorObj}
                    featureText={featureText}
                    featureIcon={<FeatureIcon className="w-6 h-6" />}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="text-center py-8 sm:py-10 px-4">
        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-slate-900"
          style={{ fontFamily: '"Cormorant Upright", cursive' }}
        >
          Your Financial Journey Starts Now
        </h3>
        <p className="mx-auto mb-6 sm:mb-10 text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed">
          Join thousands who’ve simplified their personal budgeting with Pocket
          Pilot. No ads. No hidden fees. Just clarity and control.
        </p>

        <div className="flex justify-center">
          <Button
            btnTitle="Start Free"
            btnVariant={"primary"}
            size="lg"
            onBtnClick={() => {
              if (!user) return navigate("/login");
              navigate("/dashboard");
            }}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
