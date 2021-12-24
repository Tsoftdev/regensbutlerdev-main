import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./BackgroundSlider.css";
import slide01 from "../images/slide01.jpg";
import slide02 from "../images/slide02.jpg";
import slide03 from "../images/slide03.jpg";
import slide04 from "../images/slide04.jpg";

const BackgroundSlider = () => {
  const autoplay = true;
  const slideImages = [slide01, slide02, slide03, slide04];
  return (
    <div className="backgroundslider md:mt-20">
      <Slide autoplay={autoplay} easing="ease" style={{ height: "100%" }}>
        <div className="slideitem" style={{ height: "100%" }}>
          <div
            style={{
              backgroundImage: `url(${slideImages[0]})`,
              height: "100%",
            }}
          >
            <div className="backgroundslider-text">
              Bestellen Sie jetzt ihre wöchentlichen Einkäufe gemütlich von zu
              Hause.
            </div>
          </div>
        </div>
        <div className="slideitem" style={{ height: "100%" }}>
          <div
            style={{
              backgroundImage: `url(${slideImages[1]})`,
              height: "100%",
            }}
          >
            <div className="backgroundslider-text">
              Stay Home - In Zeiten der Corona-Pandemie sicher shoppen.
            </div>
          </div>
        </div>
        <div className="slideitem" style={{ height: "100%" }}>
          <div
            style={{
              backgroundImage: `url(${slideImages[2]})`,
              height: "100%",
            }}
          >
            <div className="backgroundslider-text">
              Regensbutler - Für Regensburg und Umgebung
            </div>
          </div>
        </div>
        <div className="slideitem" style={{ height: "100%" }}>
          <div
            style={{
              backgroundImage: `url(${slideImages[3]})`,
              height: "100%",
            }}
          >
            <div className="backgroundslider-text">
              Lassen Sie sich Ihre Wocheneinkäufe direkt nach Hause bringen
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default BackgroundSlider;
