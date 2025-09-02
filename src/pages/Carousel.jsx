import React from "react";
import { motion } from "framer-motion";


const steps = [
  {
    title: "Upload Documents Securely",
    description:
      "Drag and drop your legal documents or browse files. Everything is encrypted and safe.",
  },
  {
    title: "AI Reads and Summarizes",
    description:
      "Our AI extracts key points, summaries, and potential legal issues from your documents instantly.",
  },
  {
    title: "Intelligent Analysis",
    description:
      "Advanced models highlight risks, important clauses, and relevant precedents automatically.",
  },
  {
    title: "Ask Questions Publicly",
    description:
      "You can now ask questions publicly in a secure forum to get insights from AI and verified lawyers.",
  },
  {
    title: "Receive Instant Insights",
    description:
      "Get AI-generated answers with clarity, accuracy, and actionable recommendations.",
  },
  {
    title: "Lawyer Collaboration",
    description:
      "Certified lawyers can review your case and provide professional guidance to ensure correctness.",
  },
  {
    title: "Track and Save History",
    description:
      "All your documents, analyses, and Q&A history are securely stored for future reference.",
  },
];

export default function AutoCarousel() {
  const items = [...steps, ...steps];

  return (
    <div className="continuous-carousel-container">
      <motion.div
        className="continuous-carousel-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {items.map((step, idx) => (
          <div className="carousel-card" key={idx}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
