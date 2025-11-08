import React, { useState, useEffect } from "react";

const ServerNoticeBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const bannerClosed = localStorage.getItem("serverNoticeClosed");
    console.log(bannerClosed);
    if (!bannerClosed) {
      setShowBanner(true);
    }
  }, []);

  const handleClose = () => {
    setShowBanner(false);
    localStorage.setItem("serverNoticeClosed", "true");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[60%] rounded shadow-xl border-l-4 bg-yellow-100 text-yellow-900 border-b border-yellow-300 px-4 py-3 flex items-start justify-between z-50">
      <p className="text-base md:text-lg font-medium pr-2">
        ⚠️ This may take <span className="font-semibold">1–2 minutes</span> to
        load on your <span className="font-semibold">first visit</span> since we
        are using the <b>free plan</b> of OnRender to host our backend server.
        It goes to sleep after 15 minutes of inactivity.
      </p>
      <button
        onClick={handleClose}
        className="text-rose-500 hover:text-rose-600 cursor-pointer font-bold text-xl ml-2"
      >
        ✕
      </button>
    </div>
  );
};

export default ServerNoticeBanner;
