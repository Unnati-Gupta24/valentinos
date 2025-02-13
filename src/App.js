import { useState, useEffect, useRef } from "react";
import "./App.css";

const roasts = [
  "Listen close @{username}, your love life's a horror show / Making every dating app hit a new low / Got more issues than a magazine rack / Your relationship history's permanently black / Even your shadow's trying to run away / Making cupid file for a holiday 🏃‍♂️",

  "Yo @{username}, you're the valentine nobody wants to claim / Making every dating site reconsider its game / Got more blocks than a LEGO factory floor / Your relationship status? Forever 'ignore' / Even your pickup lines need restraining orders / Making love run back across borders 🚫",

  "@{username}'s approach to love's like a train wreck in slow-mo / Making every match wish they'd chosen 'FOMO' / Got more baggage than an airport carousel / Your dating history's straight outta hell / Even your emojis look depressed / Your love life's permanently suppressed 😔",

  "Here's the truth @{username}, straight no chaser / Your love life's flatter than a laser / Got more issues than a comic book store / Making every match run for the door / Even your pets are questioning their choices / Your dating profile's setting off warning voices 🚨",

  "Yo @{username}, your relationships are like my darkest songs / Everything about your approach is wrong / Got more red flags than a bullfight show / Your emotional depth's hitting new low / Even your mirror's trying to crack / Your love life's permanently off track 🎭",

  "@{username}'s making dating apps consider retirement / Got more issues than government requirement / Your love life's like a horror movie script / Making every potential match jump ship / Even your diary's calling for help / Your romance game's destroying itself 📝",

  "Check it @{username}, you're like a dating disaster zone / Making every match wish they'd stayed home / Got more walls than a maze convention / Your emotional state needs intervention / Even your selfies show the pain / Your love life's going down in flames 🔥",

  "Last call @{username}, your love life's beyond repair / Making every dating site display 'beware' / Got more issues than a therapy group / Your relationship game's an endless loop / Even your future's trying to change past / Making sure no romance can last ⚠️",
];

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [result, setResult] = useState("");
  const usernameRef = useRef(null);
  const heartsContainerRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.setAttribute("data-theme", isDarkTheme ? "light" : "dark");
  };

  const createSparkles = (x, y) => {
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = ${x}px;
      sparkle.style.top = ${y}px;
      sparkle.style.setProperty("--tx", ${(Math.random() - 0.5) * 200}px);
      sparkle.style.setProperty("--ty", ${(Math.random() - 0.5) * 200}px);
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  };

  const createHeart = () => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = ["💖", "💘", "💝", "💔"][Math.floor(Math.random() * 4)];
    heart.style.left = ${Math.random() * 100}vw;
    heart.style.animationDuration = ${Math.random() * 3 + 4}s;
    heart.style.animationDelay = ${Math.random() * 2}s;
    if (heartsContainerRef.current) {
      heartsContainerRef.current.appendChild(heart);
    }
    setTimeout(() => heart.remove(), 6000);
  };

  const getRoastIndex = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = (hash << 5) - hash + username.charCodeAt(i);
    }
    return Math.abs(hash) % roasts.length;
  };

  const generateRoast = () => {
    const username = usernameRef.current?.value.trim();
    if (!username) return alert("INPUT REQUIRED");
];

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef(null);
  const heartsContainerRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.setAttribute("data-theme", isDarkTheme ? "light" : "dark");
  };

  const createSparkles = (x, y) => {
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.setProperty("--tx", `${(Math.random() - 0.5) * 200}px`);
      sparkle.style.setProperty("--ty", `${(Math.random() - 0.5) * 200}px`);
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  };

  const createHeart = () => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = ["💖", "💘", "💝", "💔"][Math.floor(Math.random() * 4)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    if (heartsContainerRef.current) {
      heartsContainerRef.current.appendChild(heart);
    }
    setTimeout(() => heart.remove(), 6000);
  };

  const getRoastIndex = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = (hash << 5) - hash + username.charCodeAt(i);
    }
    return Math.abs(hash) % roasts.length;
  };

  const checkGithubUsername = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      return response.status === 200;
    } catch (error) {
      console.error("Error checking GitHub username:", error);
      return false;
    }
  };

  const generateRoast = async () => {
    const username = usernameRef.current?.value.trim();
    if (!username) {
      alert("INPUT REQUIRED");
      return;
    }

    setIsLoading(true);
    const isValidGithubUser = await checkGithubUsername(username);
    setIsLoading(false);

    if (!isValidGithubUser) {
      alert("Invalid GitHub username! Please enter a valid GitHub username.");
      return;
    }

    const rect = document.querySelector(".btn")?.getBoundingClientRect();
    if (rect) {
      createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    const index = getRoastIndex(username);
    setResult(
      `@${username}: ${roasts[index].replace(/\{username\}/g, username)}`
    );
  };

  useEffect(() => {
    const heartInterval = setInterval(createHeart, 500);
    return () => clearInterval(heartInterval);
  }, []);

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>THEME</button>
      <div className="cyber-grid"></div>
      <div className="scanline"></div>
      <div className="hearts" ref={heartsContainerRef}></div>

      <div className="scroll-container">
        <div className="content-wrapper">
          <div className="container">
            <h1 className="title">💻 Valentino Roaster 🔥</h1>
            <input
              type="text"
              className="input-field"
              id="username"
              placeholder="ENTER GITHUB USERNAME"
              ref={usernameRef}
            />
            <button 
              className={`btn ${isLoading ? 'loading' : ''}`} 
              onClick={generateRoast}
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Find my valentine 💘'}
            </button>
            <div className="result">{result}</div>
          </div>
        </div>
      </div>
    </>
  );
}
    
  