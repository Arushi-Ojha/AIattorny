import React, { useRef, useEffect } from "react";
import Arushi from "../assets/Arushi_explaining_AIattorney.mp4"
function AboutMeVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 } // video plays when 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "50px 20px",
        maxWidth: "1000px",
        margin: "0 auto",
        gap: "2rem",
      }}
    >
      {/* Left: About paragraph */}
      <div style={{ flex: 1 }}>
        <h2>About Me</h2>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#333" }}>
          Hi! I am <strong>Arushi</strong>, a passionate developer with experience
          in React, Node.js, and full-stack web development. I enjoy building
          interactive web applications and learning cutting-edge technologies to
          deliver modern, responsive, and user-friendly software.
        </p>
      </div>

      {/* Right: Video */}
      <div style={{ flex: 1 }}>
        <video
          ref={videoRef}
          src={Arushi} // replace with your video link
          style={{ width: "100%", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
          muted
          controls
        />
      </div>
    </div>
  );
}

export default AboutMeVideo;
