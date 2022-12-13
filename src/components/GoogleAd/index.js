import React, { useState, useEffect } from "react";
import { Row, Col } from "@nextui-org/react";
import { getCookieConsentValue } from "react-cookie-consent";

export function GoogleAd({ margins = "5em", alignment = "center" }) {
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
    <Row
      justify={alignment}
      css={{ mt: margins, mb: margins, width: "auto" }}
      gap={2}
    >
      <Col span={12}>
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
      </Col>
    </Row>
  );
}
