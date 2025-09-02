import React from "react";
import B1 from "../assets/bg1.png";
import B2 from "../assets/bg2.png";
import B3 from "../assets/bg3.png";
import B4 from "../assets/bg4.png";
import B5 from "../assets/bg5.png";
import B6 from "../assets/bg6.png";

function Frame() {
  const leftImages = [B1, B2, B3];
  const rightImages = [B4, B5, B6];

  // Function to randomly assign tilt class
  const getRandomTilt = () => {
    return Math.random() > 0.5 ? "tilt-left" : "tilt-right";
  };

  return (
    <>
      <div className="frame-left">
        {leftImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`left-${idx}`}
            className={`frame-img ${getRandomTilt()}`}
          />
        ))}
      </div>

      <div className="frame-right">
        {rightImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`right-${idx}`}
            className={`frame-img ${getRandomTilt()}`}
          />
        ))}
      </div>
    </>
  );
}

export default Frame;
