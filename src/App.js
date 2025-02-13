import { useState, useEffect, useRef } from "react";
import "./App.css";

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

  const generateRoast = () => {
    const username = usernameRef.current?.value.trim();
    if (!username) return alert("INPUT REQUIRED");

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
            <h1 className="title">💻 Valentino roaster 🔥</h1>
            <input
              type="text"
              className="input-field"
              id="username"
              placeholder="ENTER USERNAME"
              ref={usernameRef}
            />
            <button className="btn" onClick={generateRoast}>
              Find my valentine 💘
            </button>
            <div className="result">{result}</div>
          </div>
        </div>
      </div>
    </>
 );
}
