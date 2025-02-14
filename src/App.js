import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const roasts = [
  "Yo @{username}, you're like a dating app glitch, every swipe's a malfunction / Your love life's so tragic it needs a documentary production / Got more baggage than an airport, more issues than Vogue / Your relationship status? Permanently in 'epilogue' / Even cupid took one look and said 'nah dawg I'm good' / Treating red flags like Pokemon cards in your neighborhood 🎭",

  "Listen @{username}, your dating history's darker than my lyrics / Got trust issues so deep they causing atmospherics / Playing games with hearts like it's your favorite sport / Every ex you got needs therapy support / Your love life's a wrapper, but you ain't ever gonna make it / 'Cause every chance at love, you somehow manage to break it 💔",

  "@{username} out here treating love like it's a joke / Every relationship you touch immediately goes broke / Your emotional depth's shallower than a kiddie pool / Playing with hearts like a certified fool / Even your diary entries need a trigger warning / Your attachment style? Permanently in mourning 🚩",

  "Yo @{username}, you've got problems even Dr. Dre can't fix / Your romance game's weaker than mumble rap lyrics / Collecting red flags like they're platinum plaques / Got more commitment issues than my first contracts / Even your imaginary friends are filing restraining orders / Your love life's crossing all the wrong borders 🎯",

  "Here's the truth @{username}, straight from Slim / Your chances of finding love are getting mighty slim / Got more defense mechanisms than Fort Knox / Treating potential partners like they're just props / Your dating profile should come with hazard pay / 'Cause anyone who swipes right's gonna need a getaway 🏃",

  "@{username}'s approach to love's like a diss track gone wrong / Got more toxic patterns than a SoundCloud song / Your relationship status? Permanently 'it's complicated' / Every ex you got is still traumatized and sedated / Even therapy needs therapy after your sessions / Turn more people off than bad WiFi connections 💊",

  "Listen up @{username}, this ain't no love song / Everything about your dating game is dead wrong / Got more red flags than a communist parade / Every potential match runs like they're getting paid / Your personality's like a bootleg DVD / Trying to sell a fake version of what love could be 📺",

  "Yo @{username}, your love life's like my darkest verses / Got more issues than a hospital's got nurses / Playing with hearts like they're demo tapes / Collection of exes all need escape / Your dating profile's scarier than horror flicks / Making people ghost faster than paranormal tricks 👻",

  "@{username}, you're the reason dating apps need a panic button / Your attachment style's got more knots than a glutton / Making therapists rich with your relationship drama / Got more baggage than a llama farmer's llama / Even AI matchmakers see you and crash / Your love life's heading straight for the trash 🤖",

  "Check it @{username}, your love life's a certified mess / Making every ex need immediate witness protect / Got more walls up than a maximum prison / Your emotional depth's stuck in permanent mission / Even your selfies scream 'approach with care' / Making Tinder consider a special prayer 🙏",

  "Yo @{username}, you're like a relationship apocalypse / Making every match regret their right swipes / Got more commitment issues than a phone contract / Your love life's making Satan want to retract / Even your plants are dying to get away / Your dating game's in permanent decay 💀",

  "@{username}'s out here breaking hearts like they're made of glass / Making every potential match run fast / Your emotional baggage needs its own ZIP code / Got more red flags than a construction road / Even your diary's filing for emotional distress / Your love life's a permanent SOS 🆘",

  "Listen close @{username}, your love life's a horror show / Making every dating app hit a new low / Got more issues than a magazine rack / Your relationship history's permanently black / Even your shadow's trying to run away / Making cupid file for a holiday 🏃‍♂️",
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
    if (!heartsContainerRef.current) return;
    
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = ["💖", "💘", "💝", "💔"][Math.floor(Math.random() * 4)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    
    heartsContainerRef.current.appendChild(heart);
    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove();
      }
    }, 6000);
  };

  const getRoastIndex = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = ((hash << 5) - hash) + username.charCodeAt(i);
    }
    return Math.abs(hash) % roasts.length;
  };

  const checkGithubUsername = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (response.status === 403) {
        console.warn('Rate limited by GitHub API, proceeding without validation');
        return true;
      }
      
      if (response.status === 404) {
        return false;
      }
      
      return response.status === 200;
    } catch (error) {
      console.error("Error checking GitHub username:", error);
      return true;
    }
  };

  const generateRoast = async () => {
    if (!usernameRef.current) return;
    
    const username = usernameRef.current.value.trim();
    if (!username) {
      alert("INPUT REQUIRED");
      return;
    }

    if (!/^[a-zA-Z0-9-]+$/.test(username)) {
      alert("Invalid GitHub username format!");
      return;
    }

    setIsLoading(true);
    setResult(""); 

    try {
      const isValidGithubUser = await checkGithubUsername(username);
      
      if (!isValidGithubUser) {
        alert("Invalid GitHub username! Please enter a valid GitHub username.");
        return;
      }

      const index = getRoastIndex(username);
      const roast = `@${username}: ${roasts[index].replace(/\{username\}/g, username)}`;
      setResult(roast);

      const button = document.querySelector(".btn");
      if (button) {
        const rect = button.getBoundingClientRect();
        createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    } catch (error) {
      console.error("Error generating roast:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      generateRoast();
    }
  };

  useEffect(() => {
    const heartInterval = setInterval(createHeart, 500);
    return () => clearInterval(heartInterval);
  }, []);

  return (
    <div className="app">
      <button className="theme-toggle" onClick={toggleTheme}>
        THEME
      </button>
      <div className="cyber-grid" />
      <div className="scanline" />
      <div className="hearts" ref={heartsContainerRef} />

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
              onKeyPress={handleKeyPress}
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
    </div>
  );
} 
