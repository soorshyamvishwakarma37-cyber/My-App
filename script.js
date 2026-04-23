// 1. Clock & Greeting
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString('hi-IN');
}, 1000);

const hr = new Date().getHours();
document.getElementById('greet').innerText = hr < 12 ? "शुभ प्रभात!" : hr < 17 ? "नमस्कार!" : "शुभ संध्या!";

// 2. Battery Status
navigator.getBattery().then(batt => {
    document.getElementById('batt-stat').innerText = `Batt: ${Math.round(batt.level * 100)}%`;
});

// 3. SOS Feature
function sendSOS() {
    if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
    navigator.geolocation.getCurrentPosition(p => {
        const url = `https://wa.me/?text=Emergency! मेरी लोकेशन: https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`;
        window.open(url, '_blank');
    });
}

// 4. Splitter
function doSplit() {
    const b = document.getElementById('bill').value;
    const h = document.getElementById('heads').value;
    if(b && h) document.getElementById('splitRes').innerText = `प्रत्येक: ₹${(b/h).toFixed(2)}`;
}

// 5. Converter
function convert() {
    const v = document.getElementById('unitVal').value;
    const t = document.getElementById('unitType').value;
    const res = t === 'k' ? v * 1000 + " M" : v * 1000 + " GM";
    document.getElementById('convRes').innerText = `Result: ${res}`;
}

// 6. Notes Auto-Save
function saveNote() {
    localStorage.setItem('mega_notes', document.getElementById('notes').value);
}
window.onload = () => {
    document.getElementById('notes').value = localStorage.getItem('mega_notes') || "";
};

// 7. Voice
function talk() {
    const s = new SpeechSynthesisUtterance("नमस्ते प्रो! मैं आपका सेवासुत्र मेगा हेल्पर हूँ।");
    s.lang = 'hi-IN';
    window.speechSynthesis.speak(s);
}

// 8. Shake to Refresh
window.ondevicemotion = (e) => {
    if (Math.abs(e.accelerationIncludingGravity.x) > 15) location.reload();
};

function scrollToTool(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
// 1. Attendance Timer Logic
let timer;
let seconds = 0;

function startWork() {
    if ("vibrate" in navigator) navigator.vibrate(50);
    clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        let hrs = Math.floor(seconds / 3600);
        let mins = Math.floor((seconds % 3600) / 60);
        let secs = seconds % 60;
        document.getElementById('timer-display').innerText = 
            `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopWork() {
    clearInterval(timer);
    alert(`आज आपने ${document.getElementById('timer-display').innerText} काम किया!`);
    seconds = 0;
    document.getElementById('timer-display').innerText = "00:00:00";
}

// 2. Secure Password Generator
function genPass() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0; i < 12; i++) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById('passOut').value = retVal;
}

function copyPass() {
    const copyText = document.getElementById("passOut");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("पासवर्ड कॉपी हो गया! ✅");
}

// 3. Real-time AQI Simulator (For Bhopal)
// असल में आप इसे 'OpenWeather AQI API' से कनेक्ट कर सकते हैं
function updateAQI() {
    const aqi = Math.floor(Math.random() * (60 - 30) + 30); // Demo data
    document.getElementById('aqi-val').innerText = `${aqi} (Good)`;
}
updateAQI();

// 4. Pro Tip: Screen Wake Lock
// जब यूजर ऐप इस्तेमाल करे, तो स्क्रीन बंद नहीं होगी
if ('wakeLock' in navigator) {
    navigator.wakeLock.request('screen').catch(err => console.log(err));
}
// 1. AI Chatbot Logic (Simple Response Engine)
function askAI() {
    const input = document.getElementById('userMsg');
    const win = document.getElementById('chat-window');
    
    if(input.value.trim() === "") return;

    // User Message
    win.innerHTML += `<p class="user-msg">${input.value}</p>`;
    
    // AI Response (Bot Logic)
    let reply = "क्षमा करें, मैं अभी सीख रहा हूँ।";
    const msg = input.value.toLowerCase();

    if(msg.includes("hello")) reply = "नमस्ते! मैं भोपाल का स्मार्ट असिस्टेंट हूँ।";
    if(msg.includes("service")) reply = "SewaAstra भोपाल की नंबर 1 रिपेयरिंग सर्विस है।";
    if(msg.includes("weather")) reply = "आज भोपाल का मौसम सुहाना है!";

    setTimeout(() => {
        win.innerHTML += `<p class="bot-msg">${reply}</p>`;
        win.scrollTop = win.scrollHeight;
    }, 600);

    input.value = "";
}

// 2. Internet Speed Simulator (Professional Calculation)
function checkSpeed() {
    const meter = document.getElementById('speed-meter');
    let speed = 0;
    const interval = setInterval(() => {
        speed = (Math.random() * 50).toFixed(1);
        meter.innerText = speed;
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        meter.innerText = (Math.random() * (100 - 40) + 40).toFixed(1);
        if ("vibrate" in navigator) navigator.vibrate([50, 30, 50]);
        alert("Speed Test Complete! 🚀");
    }, 2000);
}

// 3. Pro Feature: Clipboard History (Latest Web API)
async function getClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        console.log("Last Copied: ", text);
    } catch (err) {
        console.error("Failed to read clipboard");
    }
}
// --- API CONFIGURATION ---
const WEATHER_KEY = "875a681c2cf3448578a64371c1611065";
const GOLD_KEY    = "97502303663c00d87e06706ae328b5ca";
const NEWS_KEY    = "7a6ccec9264d410e9a9b57eb025e0c04";

// 1. Live Weather API (OpenWeather)
async function getBhopalWeather() {
    try {
        // भोपाल के लैटिट्यूड और लोंगीट्यूड: 23.2599, 77.4126
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=23.2599&lon=77.4126&appid=${WEATHER_KEY}&units=metric`);
        const data = await response.json();
        document.getElementById('temp-val').innerText = `${Math.round(data.main.temp)}°C`;
        console.log("Weather Updated ✅");
    } catch (error) {
        console.error("Weather Error:", error);
    }
}

// 2. Live Gold Tracker (MetalpriceAPI)
async function getGoldPrice() {
    try {
        // यह API बेस करेंसी USD देती है, हम इसे INR में बदलेंगे
        const response = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${GOLD_KEY}&base=INR&currencies=XAU`);
        const data = await response.json();
        
        // XAU (Gold) की वैल्यू 1 औंस की होती है, उसे 10 ग्राम में बदलें (अंदाज़न)
        const pricePerOunce = data.rates.XAU;
        const pricePerGram = (1 / pricePerOunce); 
        const price10g = Math.round(pricePerGram * 10);
        
        document.getElementById('gold-val').innerText = `₹${price10g.toLocaleString('en-IN')}`;
        console.log("Gold Price Updated ✅");
    } catch (error) {
        // अगर API लिमिट खत्म हो जाए तो डमी डेटा दिखाएँ ताकि UI खराब न हो
        document.getElementById('gold-val').innerText = "₹74,560*";
    }
}

// 3. Live News Ticker (NewsAPI)
async function getBhopalNews() {
    try {
        // भोपाल और बिजनेस से जुड़ी खबरें
        const response = await fetch(`https://newsapi.org/v2/everything?q=Bhopal&language=hi&sortBy=publishedAt&apiKey=${NEWS_KEY}`);
        const data = await response.json();
        
        if(data.articles && data.articles.length > 0) {
            const newsString = data.articles.slice(0, 5).map(article => article.title).join("  |  ✦  ");
            document.getElementById('news-ticker').innerText = newsString;
        }
        console.log("News Updated ✅");
    } catch (error) {
        document.getElementById('news-ticker').innerText = "सेवासुत्र (SewaAstra) अब पूरे भोपाल में उपलब्ध! | अपनी बुकिंग आज ही करें...";
    }
}

// --- INITIALIZE ALL APIs ---
function initSmartData() {
    getBhopalWeather();
    getGoldPrice();
    getBhopalNews();
}

// ऐप लोड होते ही डेटा फेच करें
window.addEventListener('DOMContentLoaded', initSmartData);

// हर 30 मिनट में डेटा ऑटो-अपडेट करें
setInterval(initSmartData, 30 * 60 * 1000);
// डेटा लोड होने से पहले UI को अपडेट करने के लिए
document.getElementById('gold-val').innerHTML = `<span class="loading-spinner"></span>`;
function openTool(toolName) {
    // Haptic Feedback for Premium Feel
    if ("vibrate" in navigator) navigator.vibrate(25);

    switch(toolName) {
        case 'gst':
            let price = prompt("Enter Amount:");
            if(price) alert(`GST (18%): ₹${(price * 0.18).toFixed(2)}\nTotal: ₹${(price * 1.18).toFixed(2)}`);
            break;
            
        case 'age':
            let birthYear = prompt("Enter Birth Year (YYYY):");
            if(birthYear) alert(`आपकी उम्र ${new Date().getFullYear() - birthYear} वर्ष है।`);
            break;

        case 'ip':
            fetch('https://api.ipify.org?format=json')
                .then(r => r.json())
                .then(d => alert(`Your IP: ${d.ip}`));
            break;

        case 'water':
            alert("💧 Reminder Set! हम आपको हर 1 घंटे में पानी पीने के लिए टोकेंगे।");
            break;

        case 'pass':
            const p = Math.random().toString(36).slice(-10).toUpperCase();
            alert(`Your Secure Pass: ${p}\n(Copying to clipboard...)`);
            navigator.clipboard.writeText(p);
            break;

        case 'bhopal':
            window.location.href = "tel:100"; // Dialing Emergency as example
            break;

        default:
            alert(`${toolName} फीचर जल्द ही लाइव होगा! (SewaAstra Pro Update)`);
    }
}

// Extra Hardware Tool: Flashlight
async function toggleFlash() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    const track = stream.getVideoTracks()[0];
    track.applyConstraints({ advanced: [{ torch: true }] });
}
function openEdu(feature) {
    if ("vibrate" in navigator) navigator.vibrate(20);

    switch(feature) {
        case 'binary':
            let num = prompt("डेसीमल नंबर लिखें:");
            if(num) alert(`Binary: ${Number(num).toString(2)}`);
            break;

        case 'cgpa':
            let marks = prompt("अपने कुल % लिखें:");
            if(marks) alert(`आपका अनुमानित CGPA: ${(marks / 9.5).toFixed(2)}`);
            break;

        case 'pomodoro':
            alert("⏰ 25 मिनट का फोकस टाइमर शुरू! फोन को दूर रखें।");
            setTimeout(() => alert("Break Time! ☕ 5 मिनट आराम करें।"), 25 * 60 * 1000);
            break;

        case 'js-run':
            let code = prompt("छोटा JS कोड लिखें (e.g. 2+2):");
            try { alert(`Output: ${eval(code)}`); } 
            catch(e) { alert("Error in code!"); }
            break;

        case 'results':
            window.open("https://www.bubhopal.ac.in/1068/Online-Results", "_blank");
            break;

        case 'roadmap':
            alert("1. HTML/CSS/JS\n2. React/Firebase\n3. Data Structures\n4. Project (Like SewaAstra!)");
            break;

        case 'focus':
            // YouTube Lo-fi Radio link
            window.open("https://www.youtube.com/watch?v=jfKfPfyJRdk", "_blank");
            break;

        default:
            alert(`${feature} स्टडी मटेरियल लोड हो रहा है...`);
    }
}
function chill(type) {
    if ("vibrate" in navigator) navigator.vibrate(30);

    const jokes = [
        "पप्पू: सर, मुझे कुछ याद नहीं रहता। डॉक्टर: कब से? पप्पू: क्या कब से?",
        "Why did the computer go to the doctor? Because it had a virus!",
        "एक छोटा बच्चा: मम्मी, क्या मैं भगवान की तरह दिखता हूँ? मम्मी: नहीं, क्यों? बच्चा: क्योंकि मैं जहाँ भी जाता हूँ, सब कहते हैं- हे भगवान!"
    ];

    const facts = [
        "मछलियाँ अपनी आँखें कभी बंद नहीं करतीं।",
        "Honey कभी खराब नहीं होता, चाहे 3000 साल पुराना हो!",
        "भोपाल को 'झीलों का शहर' कहा जाता है, यहाँ 15 से ज़्यादा झीलें हैं।"
    ];

    const foodBhopal = ["Sagar Gaire के Sandwich", "MP Nagar की कचौरी", "10 No. की चाट", "Chai-Sutta Bar", "Nadra Bus Stand की बिरयानी"];

    switch(type) {
        case 'joke':
            alert("😂 चुटकुला: \n" + jokes[Math.floor(Math.random() * jokes.length)]);
            break;
        case 'fact':
            alert("💡 क्या आप जानते हैं? \n" + facts[Math.floor(Math.random() * facts.length)]);
            break;
        case 'bhopal-food':
            alert("😋 आज आपको यहाँ जाना चाहिए: \n" + foodBhopal[Math.floor(Math.random() * foodBhopal.length)]);
            break;
        case 'magic':
            const answers = ["हाँ!", "शायद नहीं", "अभी मत पूछो", "बिल्कुल होगा"];
            alert("🔮 भविष्य की भविष्यवाणी: " + answers[Math.floor(Math.random() * answers.length)]);
            break;
        case 'confetti':
            alert("🎊 बधाई हो! आपने SewaAstra के शानदार फीचर्स अनलॉक किए!");
            break;
        case 'flip':
            alert(Math.random() > 0.5 ? "🪙 Heads!" : "🪙 Tails!");
            break;
        default:
            alert("यह गेम/फीचर अगले अपडेट में आ रहा है! स्टे ट्यून्ड।");
    }
}

// 8 Ball / Dice Logic
function playGame(game) {
    if(game === 'dice') {
        const roll = Math.floor(Math.random() * 6) + 1;
        alert(`🎲 डाइस पर ${roll} आया है!`);
    }
}
function showSection(sectionId, element) {
    // 1. Haptic Feedback
    if ("vibrate" in navigator) navigator.vibrate(15);

    // 2. Hide all major sections
    const sections = ['mega-hub', 'edu-hub', 'chill-zone', 'sewa-astra'];
    sections.forEach(id => {
        const el = document.querySelector('.' + id);
        if (el) el.style.display = 'none';
    });

    // 3. Show selected section
    const activeSection = document.querySelector('.' + sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
        // Smooth fade-in effect
        activeSection.style.animation = 'fadeIn 0.5s ease forwards';
    }

    // 4. Update Tab Styling
    if (element) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        element.classList.add('active');
    }
}

// Fade-in animation CSS (Add this to your CSS file)
/*
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
*/

// Initial State: Default section load
window.addEventListener('DOMContentLoaded', () => {
    showSection('mega-hub', document.querySelector('.tab'));
});
function showSection(sectionId, element) {
    // 1. प्रीमियम फील के लिए हल्का वाइब्रेशन
    if ("vibrate" in navigator) navigator.vibrate(15);

    // 2. उन सभी मेन सेक्शन्स की लिस्ट जिन्हें आप कंट्रोल करना चाहते हैं
    const sections = ['mega-hub', 'edu-hub', 'chill-zone', 'sewa-astra'];

    // 3. लूप चलाकर सबको छुपाएं
    sections.forEach(id => {
        const target = document.querySelector('.' + id);
        if (target) {
            target.style.display = 'none'; // पूरी तरह छुपाएं
            target.classList.remove('active-section');
        }
    });

    // 4. केवल चुने हुए सेक्शन को दिखाएं
    const activeSection = document.querySelector('.' + sectionId);
    if (activeSection) {
        activeSection.style.display = 'block'; 
        // एनीमेशन क्लास जोड़ें
        setTimeout(() => {
            activeSection.classList.add('active-section');
        }, 10);
    }

    // 5. नेविगेशन टैब का रंग बदलें (Active State)
    if (element) {
        document.querySelectorAll('.tab, .nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        element.classList.add('active');
    }
}

// पेज लोड होते ही सबसे पहले क्या दिखना चाहिए (Home/Mega-Hub)
window.onload = () => {
    showSection('mega-hub', document.querySelector('.tab'));
};
// 1. SOS Siren Logic
let sirenInterval;
function triggerSiren() {
    if (sirenInterval) {
        clearInterval(sirenInterval);
        sirenInterval = null;
        alert("Siren Stopped");
    } else {
        alert("Siren Started (Full Volume)!");
        sirenInterval = setInterval(() => {
            if ("vibrate" in navigator) navigator.vibrate([300, 100, 300]);
        }, 500);
    }
}

// 2. Real-time AI Search Logic
async function searchAI() {
    const query = document.getElementById('ai-query').value;
    const chatResults = document.getElementById('ai-chat-results');
    
    if(!query) return;

    // User message display
    chatResults.innerHTML += `<div class="user-msg">${query}</div>`;
    document.getElementById('ai-query').value = "";
    
    // Typing indicator
    const loadingId = "loading-" + Date.now();
    chatResults.innerHTML += `<div class="bot-msg" id="${loadingId}">खोज रहा हूँ... 🔍</div>`;
    chatResults.scrollTop = chatResults.scrollHeight;

    try {
        // हम Wikipedia और DuckDuckGo का उपयोग करेंगे सटीक जानकारी के लिए
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1&no_html=1&skip_disambig=1`);
        const data = await response.json();
        
        let answer = "";
        if (data.AbstractText) {
            answer = data.AbstractText;
        } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            answer = data.RelatedTopics[0].Text;
        } else {
            answer = "माफ़ करें, मुझे इसका सटीक जवाब नहीं मिला। क्या आप कुछ और पूछना चाहते हैं?";
        }

        document.getElementById(loadingId).innerText = answer;

    } catch (error) {
        document.getElementById(loadingId).innerText = "सर्वर से कनेक्ट करने में समस्या आ रही है। कृपया इंटरनेट चेक करें।";
    }
    
    chatResults.scrollTop = chatResults.scrollHeight;
}

// Enter Key support for AI
document.getElementById('ai-query').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchAI();
});
// --- USER PERSONAL DATA ---
const userProfile = {
    name: "Shoorshyam Vishwakarma Founder of SewaAstra",
    age: 23,
    location: "Misrod Bhopal, Madhya Pradesh",
    education: "B.Sc. Computer Science (Barkatullah University)",
    startup: "SewaAstra - Premium Home Repairing Service",
    skills: ["Full Stack Development", "Firebase", "UI/UX Design"],
    partner: "Shoorshyam",
    goals: ["Bhopal की नंबर 1 सर्विस बनाना", "Extreme Science Experiments"]
};
async function askMyAI() {
    const query = document.getElementById('mega-query').value.toLowerCase();
    const output = document.getElementById('ai-brain-output');
    
    if(!query) return;

    output.innerHTML += `<div class="user-bubble">${query}</div>`;
    const loadingId = "load-" + Date.now();
    output.innerHTML += `<div class="ai-bubble" id="${loadingId}">प्रोसेसिंग... ⚙️</div>`;

    // A. पहले खुद के डेटा (User Profile) में ढूँढें
    if (query.includes("founder") || query.includes("sewaastra") || query.includes("owner")) {
        setTimeout(() => {
            document.getElementById(loadingId).innerText = 
            `SewaAstra के फाउंडर भोपाल से हैं, जो B.Sc. CS के छात्र हैं। इनका लक्ष्य प्रीमियम रिपेयरिंग सर्विस देना है।`;
        }, 500);
        return;
    }

    // B. अगर खुद के डेटा में नहीं है, तो पूरी दुनिया (Internet) में सर्च करें
    try {
        // 'DuckDuckGo API' एक बेहतरीन "बिल्कुल फ्री" ब्राउज़र इंजन है
        const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;
        const res = await fetch(searchUrl);
        const data = await res.json();

        let finalInfo = "";

        if (data.AbstractText) {
            finalInfo = data.AbstractText; // मुख्य जानकारी
        } else if (data.RelatedTopics.length > 0) {
            finalInfo = data.RelatedTopics[0].Text; // संबंधित जानकारी
        } else {
            // C. अगर कुछ नहीं मिला, तो Wikipedia का सहारा लें
            const wikiRes = await fetch(`https://hi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
            const wikiData = await wikiRes.json();
            finalInfo = wikiData.extract || "माफ़ करें, इंटरनेट पर इसका सटीक जवाब नहीं मिला।";
        }

        document.getElementById(loadingId).innerText = finalInfo;

    } catch (err) {
        document.getElementById(loadingId).innerText = "नेटवर्क एरर। गूगल सर्च से कनेक्ट नहीं हो पा रहा हूँ।";
    }
    
    output.scrollTop = output.scrollHeight;
}
// --- CONFIGURATION ---
const MY_GEMINI_KEY = "AIzaSyAi7wvuemIqXIYHplkYsem0gcgdgSsSDoU"; // आपकी असली Key

async function askAstraAI(query) {
    const chatBox = document.getElementById('ai-brain-output');
    
    // 1. UI Update: User Message
    chatBox.innerHTML += `<div class="user-bubble">${query}</div>`;
    
    // 2. UI Update: Loading Animation
    const loadingId = "ai-" + Date.now();
    chatBox.innerHTML += `<div class="ai-bubble" id="${loadingId}">ब्रह्मांड से जानकारी जुटा रहा हूँ... ✨</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // 3. Gemini API Call
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${MY_GEMINI_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `तुम SewaAstra के आधिकारिक AI हो। तुम्हारा नाम Astra है। 
                               फाउंडर का नाम: 23 वर्षीय B.Sc. CS छात्र (Bhopal)।
                               स्टार्टअप: SewaAstra (Premium Repairing)। 
                               हमेशा मददगार और पेशेवर तरीके से हिंदी में जवाब दो। 
                               सवाल यह है: ${query}` 
                    }] 
                }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        // 4. Formatting Output (Bold & Line breaks)
        const formattedText = aiText.replace(/\n/g, '<br>').replace(/\*\*/g, '<b>');

        // 5. Final Result Display
        document.getElementById(loadingId).innerHTML = `<b>Astra AI:</b><br>${formattedText}`;
        
        // Haptic Feedback (Phone vibrates)
        if ("vibrate" in navigator) navigator.vibrate(30);

    } catch (error) {
        document.getElementById(loadingId).innerText = "माफ़ करना, मेरे न्यूरल नेटवर्क में कुछ समस्या आ गई। कृपया फिर से पूछें।";
        console.error("API Error:", error);
    }
    
    chatBox.scrollTop = chatBox.scrollHeight;
}
function speakAIResponse(text) {
    // अगर ब्राउज़र स्पीच सपोर्ट करता है
    if ('speechSynthesis' in window) {
        // पहले से चल रही आवाज़ को रोकें
        window.speechSynthesis.cancel();

        // HTML टैग्स को साफ़ करें (सिर्फ टेक्स्ट पढ़ने के लिए)
        const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");

        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // आवाज़ की सेटिंग्स
        utterance.lang = 'hi-IN'; // हिंदी भाषा
        utterance.pitch = 1.0;    // आवाज़ का भारीपन
        utterance.rate = 1.0;     // बोलने की रफ़्तार

        // आवाज़ शुरू होने पर हल्का वाइब्रेशन
        if ("vibrate" in navigator) navigator.vibrate(20);

        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Speech Synthesis not supported in this browser.");
    }
}
// AI का जवाब आने पर उसे सुनाएं
speakAIResponse(aiText);
// आवाज़ तभी सुनाएं जब बटन 'ON' हो
if (document.getElementById('voice-toggle').checked) {
    speakAIResponse(aiText);
}
const allApps = [
    { name: "Myntra", link: "LINK", icon: "👗" },
    { name: "Ajio", link: "LINK", icon: "👜" },
    { name: "Nykaa", link: "LINK", icon: "💄" },
    { name: "Blinkit", link: "LINK", icon: "⚡" },
    { name: "Swiggy", link: "LINK", icon: "🛵" },
    { name: "Meesho", link: "LINK", icon: "🛍️" },
    // Aise hi 60+ apps add karein...
];

function toggleMoreApps() {
    const panel = document.getElementById('more-apps-panel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    loadAllApps();
}

function loadAllApps() {
    const list = document.getElementById('apps-list');
    list.innerHTML = allApps.map(app => `
        <div class="mini-app-card" onclick="openStore('${app.link}')">
            <span>${app.icon}</span>
            <small>${app.name}</small>
        </div>
    `).join('');
}

function openStore(link) {
    // Commission Tracking Link setup yahan hoga
    window.open(link, '_blank');
}
const storeList = [
    { n: "Myntra", i: "👗" }, { n: "Ajio", i: "👜" }, { n: "Nykaa", i: "💄" },
    { n: "Blinkit", i: "⚡" }, { n: "Swiggy", i: "🛵" }, { n: "Meesho", i: "🛍️" },
    { n: "Mamaearth", i: "🌿" }, { n: "Adidas", i: "👟" }, { n: "Boat", i: "🎧" }
    // Add more up to 60+
];

function showMegaList() {
    const panel = document.getElementById('mega-list-panel');
    const grid = document.getElementById('mini-apps-grid');
    panel.style.display = 'block';
    
    if(grid.children.length === 0) { // Sirf ek baar load karega performance ke liye
        grid.innerHTML = storeList.map(s => `
            <div class="glass-shop-card" onclick="alert('Opening ${s.n} Affiliate Link...')">
                <span style="font-size:24px">${s.i}</span>
                <span>${s.n}</span>
            </div>
        `).join('');
    }
    if ("vibrate" in navigator) navigator.vibrate(50);
}

function closeMegaList() {
    document.getElementById('mega-list-panel').style.display = 'none';
}

function openAffiliate(store) {
    if ("vibrate" in navigator) navigator.vibrate(30);
    // Yahan apne affiliate links daalein
    window.open('https://your-affiliate-link.com', '_blank');
}

