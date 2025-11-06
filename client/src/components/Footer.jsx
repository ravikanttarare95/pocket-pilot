import React from "react";
import BrandLogo from "./BrandLogo.jsx";
import { Link } from "react-router";
import {
  SOCIAL_ICONS,
  QUICK_LINKS,
  CONTACT_INFO,
} from "./../configs/footerConfigs.js";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 z-47">
      <div className="mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div className="flex flex-col items-start space-y-4">
          <BrandLogo />

          <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
            Tracks all your income and expenses in one place, helping you stay
            in control of your finances.
          </p>
        </div>

        <div className="flex  flex-col items-start ">
          <h2 className="text-lg font-semibold mb-4">Social Links</h2>
          <div className="flex gap-4">
            {SOCIAL_ICONS.map(({ icon: Icon, goTo }) => {
              return (
                <a
                  key={goTo}
                  href={goTo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-2xl"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-slate-300">
            {QUICK_LINKS.map(({ name, goTo }) => {
              return (
                <li key={name}>
                  <Link
                    to={goTo}
                    className="hover:text-cyan-400 transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-slate-300">
            {CONTACT_INFO.map(({ title, goTo, icon: Icon }) => {
              return (
                <li key={title}>
                  <a
                    href={goTo}
                    className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200"
                  >
                    <Icon size={18} /> {title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-400">
        &copy; {new Date().getFullYear()}
        <span className="text-cyan-400"> Pocket Pilot</span>. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
