// In your component file (e.g., Compass.js)
import React from "react";
import Compass from "./assets/WayfinderCompass.svg";

export default function CompassIcon() {
  return (
    <div className="compass-wrapper">
      <img src={Compass} alt="Wayfinder Compass" />
    </div>
  );
}
