import React, { useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

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
  useEffect(() => {
    // App mounted, make the page visible!
    document?.documentElement?.classList.add("app-loaded");
    // you can use any storage
    let theme = window.localStorage.getItem("theme");

    const observer = new MutationObserver((mutation) => {
      let newTheme = theme;
      if (newTheme === "dark") {
        if (!document?.documentElement.classList.contains("dark-theme")) {
          document?.documentElement.classList.add("dark-theme");
        }
      }
      // Ensure the page is visible if the class list has changed
      if (!document?.documentElement.classList.contains("app-loaded")) {
        document?.documentElement?.classList.add("app-loaded");
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
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
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
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
