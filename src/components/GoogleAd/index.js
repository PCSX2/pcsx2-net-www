import React, { useState, useEffect } from "react";
import { getCookieConsentValue } from "react-cookie-consent";

export function GoogleAd() {
  const [displayAd, setDisplayAd] = useState(false);

  useEffect(() => {
    setDisplayAd(getCookieConsentValue("pcsx2CookieConsent") === "true");
  }, []);

  useEffect(() => {
    if (displayAd) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [displayAd]);

  return !displayAd ? null : (
    <div className="flex justify-center mt-5 mb-5 gap-2">
      <div className="flex-auto">
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            backgroundColor: "grey",
            width: "100%",
          }}
          data-ad-client={"ca-pub-0996284081546238"}
          data-ad-slot={"3330447757"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
