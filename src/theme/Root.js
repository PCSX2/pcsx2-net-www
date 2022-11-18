import React, { useEffect, useState } from "react";
import {
  createTheme,
  NextUIProvider,
  getDocumentTheme,
} from "@nextui-org/react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

const lightTheme = createTheme({
  type: "light",
  theme: {
    // colors: {...}, // optional
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    // colors: {...}, // optional
  },
});

function loadGoogleAds() {
  if (
    getCookieConsentValue("pcsx2CookieConsent") === "true" &&
    document.getElementById("googleAdScript") === null
  ) {
    const elem = document.createElement("script");
    elem.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0996284081546238";
    elem.async = true;
    elem.defer = true;
    elem.id = "googleAdScript";
    document.body.insertBefore(elem, document.body.firstChild);
  }
}

// Default implementation, that you can customize
export default function Root({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // you can use any storage
    let theme = window.localStorage.getItem("theme");
    setIsDark(theme === "dark");

    const observer = new MutationObserver((mutation) => {
      let newTheme = getDocumentTheme(document?.documentElement);
      if (newTheme === "dark") {
        if (!document?.documentElement.classList.contains("dark-theme")) {
          document?.documentElement.classList.add("dark-theme");
        }
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    });

    // Observe the document theme changes
    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style", "class"],
    });

    loadGoogleAds();

    return () => observer.disconnect();
  }, []);

  return (
    <NextUIProvider
      theme={isDark ? darkTheme : lightTheme}
      disableBaseline={true}
    >
      <CookieConsent
        location="bottom"
        buttonText="Agree"
        declineButtonText="Decline"
        cookieName="pcsx2CookieConsent"
        enableDeclineButton={true}
        style={{ background: "#2B373B" }}
        expires={150}
        onAccept={() => {
          loadGoogleAds();
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      {children}
    </NextUIProvider>
  );
}
