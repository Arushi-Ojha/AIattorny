import  { useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Flyer from "../assets/flyer.png";
import fire from "../assets/fire.mp4";
import Navbar from "./Navbar";
import MyAudio from "../assets/oppenhiemer.mp3";
import Magic from "../assets/DoctorStrange.mp4";
import S1 from "../assets/cunning.png";
import S2 from "../assets/saviour.png";
import S3 from "../assets/Hand.png";
import S4 from "../assets/bars.png";

function LandingPage() {
    var navigate= useNavigate();
    const [animate, setAnimate] = useState(false);
    const audioRef = useRef(null);
    const sectionsRef = useRef([]);
    const [visibleSections, setVisibleSections] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => {
                            if (!prev.includes(index)) return [...prev, index];
                            return prev;
                        });
                    }
                });
            },
            { threshold: 0.5 } // 50% visible to trigger
        );

        sectionsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            sectionsRef.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    const images = [S1, S2, S3, S4];

    useEffect(() => {
        const playAudioOnClick = () => {
            if (audioRef.current) {
                audioRef.current.play().catch((err) => console.log(err));
            }
            document.removeEventListener("click", playAudioOnClick);
        };

        document.addEventListener("click", playAudioOnClick);
        return () => document.removeEventListener("click", playAudioOnClick);
    }, []);


    useEffect(() => {
        setAnimate(true);
    }, []);

    const finalText = "YEAR 2025 KALIYUGA IS AT ITS PEAK";
    const [displayText, setDisplayText] = useState(finalText.replace(/./g, " "));

    useEffect(() => {
        const letters = "ABC@%*$*LMNOPQRSTUVW{:?~^}cdefghijklmnopqrstuv+=_#23456789";
        let iteration = 0;
        const totalDuration = 2000;
        const intervalTime = 10;
        const totalIterations = totalDuration / intervalTime;

        const interval = setInterval(() => {
            setDisplayText(() => {
                return finalText
                    .split("")
                    .map((char, idx) => {
                        if (idx <= (iteration / totalIterations) * finalText.length) return char;
                        if (char === " ") return " ";
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
            });

            iteration++;
            if (iteration > totalIterations) clearInterval(interval);
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    const text = `In Kaliyuga, legal documents have become cryptic.  Fraud and deception are everywhere. You need clarity, speed, and intelligence.`;

    const [displayedText, setDisplayedText] = useState("");


    const typingIdxRef = useRef(0);
    const typingTimerRef = useRef(null);

    useEffect(() => {
        console.log("[Typewriter] effect mount");

        typingIdxRef.current = 0;
        setDisplayedText("");

        if (typingTimerRef.current) {
            clearInterval(typingTimerRef.current);
            typingTimerRef.current = null;
        }

        typingTimerRef.current = setInterval(() => {
            const i = typingIdxRef.current;
            const ch = text.charAt(i);

            console.log("[Typewriter] tick", { i, chShown: ch || "(empty)", total: text.length });

            if (!ch) {
                console.log("[Typewriter] complete -> clearInterval");
                clearInterval(typingTimerRef.current);
                typingTimerRef.current = null;
                return;
            }

            setDisplayedText((prev) => prev + ch);
            typingIdxRef.current = i + 1;
        }, 100);

        return () => {
            console.log("[Typewriter] cleanup");
            if (typingTimerRef.current) {
                clearInterval(typingTimerRef.current);
                typingTimerRef.current = null;
            }
        };
    }, [text]);
    function Login(){
    navigate('/login');
  }
    return (
        <div>
            <audio ref={audioRef} src={MyAudio} loop />

            <Navbar />

            <div className="bg2 section">
                <h4 className="message">{displayText}</h4>
                <div className={`flyer ${animate ? "flyer-animate" : ""}`}>
                    <img src={Flyer} alt="flyer" />
                </div>

                <video src={fire} className="fire" autoPlay loop muted playsInline />
            </div>


            <div className="section2">
                {/* 🎥 Doctor Strange video background */}
                <video
                    src={Magic}
                    className="strange-bg"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="content">
                    <h4
                        style={{ whiteSpace: "pre-wrap", fontSize: "20px", fontFamily: "monospace" }}
                        className="s2"
                    >
                        {displayedText}
                    </h4>

                    <h5>
                        In today’s age of Kaliyug, truth is often hidden behind layers of jargon,
                        deception, and complexity. Legal documents—meant to protect—have instead
                        become a source of fear, confusion, and fraud. Inspired by the wisdom of
                        Lord Krishna in the Mahabharata, who guided Arjuna through the fog of
                        uncertainty, MyAttorneyAI was born. We believe that just as Krishna was a
                        charioteer of clarity and truth, technology can be the charioteer of
                        justice in our time. With the power of Generative AI, MyAttorneyAI
                        transforms cryptic legal documents into simple, clear, and trustworthy
                        language. It is more than a tool—it is a digital attorney by your side,
                        protecting you from deception, empowering you with knowledge, and giving
                        you the confidence to make the right decisions. Our mission is to bring
                        clarity, speed, and fairness to every individual navigating the
                        complexities of law in today’s world. In Kaliyug, wisdom is the greatest
                        weapon. Let MyAttorneyAI be yours.
                    </h5>


                    <div className="section"></div>
                </div>
            </div>
            <div>
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`pipeline-section ${visibleSections.includes(idx) ? "visible" : ""}`}
                        ref={(el) => (sectionsRef.current[idx] = el)}
                        data-index={idx}
                    >
                        <img src={img} alt={`Step ${idx + 1}`} />
                        {idx < images.length - 1 && (
                            <div className={`down-arrow ${visibleSections.includes(idx) ? "visible" : ""}`}>
                                ↓
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={Login}>Get Started</button>
        </div>
    );
}

export default LandingPage;
