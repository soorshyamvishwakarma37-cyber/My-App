 // 1. FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA4kInzUxzF6Or1sHfzXavx1nVMOx4Olak",
  authDomain: "sewaastra.firebaseapp.com",
  databaseURL: "https://sewaastra-default-rtdb.firebaseio.com",
  projectId: "sewaastra",
  storageBucket: "sewaastra.firebasestorage.app",
  messagingSenderId: "211091351218",
  appId: "1:211091351218:web:5602f5f1a36a21c3464bab",
  measurementId: "G-52QKXTC1J4"
};

// 2. PWA INSTALL LOGIC
let deferredPrompt;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(() => { document.getElementById('install-banner').style.display = 'flex'; }, 5000);
});

async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') closeModal('install-banner');
  }
}

// 3. 90 UNIQUE TOOLS DATA
const tools1 = [
    {n:"GST", i:"📊", u:"https://cleartax.in"}, {n:"SIP", i:"📈", u:"https://groww.in"}, {n:"Gold", i:"🟡", u:"https://goldprice.org"},
    {n:"ITR", i:"📑", u:"https://eportal.incometax.gov.in"}, {n:"FD", i:"💰", u:"https://www.bankbazaar.com"}, {n:"Loan", i:"🏦", u:"https://www.cashe.co.in"},
    {n:"Bills", i:"🧾", u:"https://www.bbps.org.in"}, {n:"Speed", i:"🚀", u:"https://fast.com"}, {n:"Aadhar", i:"🆔", u:"https://uidai.gov.in"},
    {n:"PAN", i:"💳", u:"https://www.onlineservices.nsdl.com"}, {n:"Voter", i:"🗳️", u:"https://voters.eci.gov.in"}, {n:"Ration", i:"🌾", u:"https://nfsa.gov.in"},
    {n:"Stocks", i:"📉", u:"https://www.nseindia.com"}, {n:"Crypto", i:"🪙", u:"https://coinmarketcap.com"}, {n:"PF", i:"🏢", u:"https://www.epfindia.gov.in"},
    {n:"Insurance", i:"🛡️", u:"https://www.policybazaar.com"}, {n:"UPI", i:"📲", u:"https://www.npci.org.in"}, {n:"Post", i:"📮", u:"https://www.indiapost.gov.in"},
    {n:"Passport", i:"🛂", u:"https://www.passportindia.gov.in"}, {n:"License", i:"🪪", u:"https://parivahan.gov.in"}, {n:"Gas", i:"🔥", u:"https://myhpgas.in"},
    {n:"Water", i:"💧", u:"https://www.india.gov.in"}, {n:"Property", i:"🏠", u:"https://www.magicbricks.com"}, {n:"Court", i:"⚖️", u:"https://ecourts.gov.in"},
    {n:"Pincode", i:"📍", u:"https://www.pincode.net.in"}, {n:"Domain", i:"🌐", u:"https://www.godaddy.com"}, {n:"Email", i:"📧", u:"https://gmail.com"},
    {n:"Weather", i:"☁️", u:"https://weather.com"}, {n:"Converter", i:"🔄", u:"https://www.unitconverters.net"}, {n:"Calculator", i:"🧮", u:"https://www.desmos.com/scientific"}
];

const tools2 = [
    {n:"BU Bhopal", i:"🎓", u:"http://bubhopal.ac.in"}, {n:"Sarkari", i:"💼", u:"https://sarkariresult.com"}, {n:"AI Chat", i:"🤖", u:"https://chatgpt.com"},
    {n:"GitHub", i:"💻", u:"https://github.com"}, {n:"Translate", i:"🌐", u:"https://translate.google.com"}, {n:"Maps", i:"🗺️", u:"https://maps.google.com"},
    {n:"Dictionary", i:"📖", u:"https://www.dictionary.com"}, {n:"Notes", i:"📝", u:"https://keep.google.com"}, {n:"PDF", i:"📄", u:"https://ilovepdf.com"},
    {n:"Canva", i:"🎨", u:"https://canva.com"}, {n:"Stack", i:"🥞", u:"https://stackoverflow.com"}, {n:"LinkedIn", i:"👔", u:"https://linkedin.com"},
    {n:"Scholar", i:"🔬", u:"https://scholar.google.com"}, {n:"Udemy", i:"📽️", u:"https://udemy.com"}, {n:"Coursera", i:"🏛️", u:"https://coursera.org"},
    {n:"W3Schools", i:"🏫", u:"https://w3schools.com"}, {n:"MDN", i:"🦊", u:"https://developer.mozilla.org"}, {n:"Replit", i:"🌀", u:"https://replit.com"},
    {n:"Figma", i:"✒️", u:"https://figma.com"}, {n:"CodePen", i:"🖊️", u:"https://codepen.io"}, {n:"Medium", i:"✍️", u:"https://medium.com"},
    {n:"Quora", i:"❓", u:"https://quora.com"}, {n:"Wikipedia", i:"📚", u:"https://wikipedia.org"}, {n:"Geeks", i:"🤓", u:"https://geeksforgeeks.org"},
    {n:"Intern", i:"🎓", u:"https://internshala.com"}, {n:"Jobs", i:"🚀", u:"https://naukri.com"}, {n:"Resume", i:"📄", u:"https://novoresume.com"},
    {n:"Unsplash", i:"📸", u:"https://unsplash.com"}, {n:"Fonts", i:"🅰️", u:"https://fonts.google.com"}, {n:"Behance", i:"🅱️", u:"https://behance.net"}
];

const tools3 = [
    {n:"Zomato", i:"🍕", u:"https://zomato.com"}, {n:"Swiggy", i:"🍔", u:"https://swiggy.com"}, {n:"YouTube", i:"📽️", u:"https://youtube.com"},
    {n:"Spotify", i:"🎵", u:"https://spotify.com"}, {n:"Netflix", i:"🎬", u:"https://netflix.com"}, {n:"Hotstar", i:"📺", u:"https://hotstar.com"},
    {n:"Blinkit", i:"⚡", u:"https://blinkit.com"}, {n:"BigBasket", i:"🥦", u:"https://bigbasket.com"}, {n:"Amazon", i:"📦", u:"https://amazon.in"},
    {n:"Flipkart", i:"🛍️", u:"https://flipkart.com"}, {n:"Myntra", i:"👗", u:"https://myntra.com"}, {n:"Ajio", i:"👟", u:"https://ajio.com"},
    {n:"Uber", i:"🚗", u:"https://uber.com"}, {n:"Ola", i:"🚕", u:"https://olacabs.com"}, {n:"Rapido", i:"🏍️", u:"https://rapido.bike"},
    {n:"IRCTC", i:"🚂", u:"https://irctc.co.in"}, {n:"MakeMyTrip", i:"✈️", u:"https://makemytrip.com"}, {n:"OYO", i:"🏨", u:"https://oyorooms.com"},
    {n:"Facebook", i:"👥", u:"https://facebook.com"}, {n:"Instagram", i:"📸", u:"https://instagram.com"}, {n:"Twitter", i:"🐦", u:"https://twitter.com"},
    {n:"Reddit", i:"🤖", u:"https://reddit.com"}, {n:"Pinterest", i:"📌", u:"https://pinterest.com"}, {n:"Discord", i:"💬", u:"https://discord.com"},
    {n:"Games", i:"🎮", u:"https://poki.com"}, {n:"Chess", i:"♟️", u:"https://chess.com"}, {n:"LiveTV", i:"📡", u:"https://jioicinema.com"},
    {n:"Lyrics", i:"🎶", u:"https://genius.com"}, {n:"Events", i:"🎟️", u:"https://bookmyshow.com"}, {n:"Vlog", i:"🤳", u:"https://tiktok.com"}
];

// 4. SCREEN NAVIGATION
function showScreen(screen) {
  document.getElementById('login-layer').style.display = 'none';
  document.getElementById('app-content').style.display = 'block';
  
  const home = document.getElementById('home-section');
  const profile = document.getElementById('profile-section');
  const navH = document.getElementById('nav-home');
  const navP = document.getElementById('nav-profile');

  if(screen === 'home') {
    home.style.display = 'block';
    profile.style.display = 'none';
    navH.classList.add('active');
    navP.classList.remove('active');
    renderGrid('grid-1', tools1);
    renderGrid('grid-2', tools2);
    renderGrid('grid-3', tools3);
  } else {
    home.style.display = 'none';
    profile.style.display = 'block';
    navH.classList.remove('active');
    navP.classList.add('active');
  }
}

function renderGrid(id, data) {
  let html = "";
  data.forEach(t => {
    html += `<div class="card" onclick="window.open('${t.u}','_blank')"><b>${t.i}</b><span>${t.n}</span></div>`;
  });
  document.getElementById(id).innerHTML = html;
}

// 5. EXIT LOGIC
window.history.pushState(null, null, window.location.href);
window.onpopstate = () => {
  document.getElementById('exit-modal').style.display = 'flex';
  window.history.pushState(null, null, window.location.href);
};

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function exitNow() { window.location.href = "about:blank"; }
let installPrompt; // प्रॉम्प्ट को स्टोर करने के लिए

// 1. ब्राउज़र के डिफ़ॉल्ट प्रॉम्प्ट को रोकना
window.addEventListener('beforeinstallprompt', (e) => {
    // डिफ़ॉल्ट बैनर को रोकें
    e.preventDefault();
    // इवेंट को स्टोर करें
    installPrompt = e;
    
    // अब अपना "Hard Popup" दिखाएं (3 सेकंड बाद)
    setTimeout(() => {
        document.getElementById('hard-install-overlay').style.display = 'flex';
    }, 3000);
});

// 2. 'अभी इंस्टॉल करें' बटन का फंक्शन
document.getElementById('btn-real-install').addEventListener('click', async () => {
    if (installPrompt) {
        // असली ब्राउज़र प्रॉम्प्ट दिखाएं
        installPrompt.prompt();
        
        // यूजर का फैसला चेक करें
        const { outcome } = await installPrompt.userChoice;
        console.log(`User response to install: ${outcome}`);
        
        // काम हो गया, अब पॉपअप छुपा दें
        closeInstallPopup();
        installPrompt = null;
    } else {
        // अगर प्रॉम्प्ट नहीं मिला (जैसे पहले से इंस्टॉल है या ब्राउज़र सपोर्ट नहीं करता)
        alert("SewaAstra पहले से इंस्टॉल है या आपका ब्राउज़र इसे सपोर्ट नहीं करता।");
        closeInstallPopup();
    }
});

function closeInstallPopup() {
    document.getElementById('hard-install-overlay').style.display = 'none';
}

// 3. चेक करें कि ऐप पहले से इंस्टॉल तो नहीं
window.addEventListener('appinstalled', () => {
    console.log('SewaAstra सफलतापूर्वक इंस्टॉल हो गया!');
    closeInstallPopup();
});
let installPrompt; // प्रॉम्प्ट को स्टोर करने के लिए

// 1. ब्राउज़र के डिफ़ॉल्ट प्रॉम्प्ट को रोकना
window.addEventListener('beforeinstallprompt', (e) => {
    // डिफ़ॉल्ट बैनर को रोकें
    e.preventDefault();
    // इवेंट को स्टोर करें
    installPrompt = e;
    
    // अब अपना "Hard Popup" दिखाएं (3 सेकंड बाद)
    setTimeout(() => {
        document.getElementById('hard-install-overlay').style.display = 'flex';
    }, 3000);
});

// 2. 'अभी इंस्टॉल करें' बटन का फंक्शन
document.getElementById('btn-real-install').addEventListener('click', async () => {
    if (installPrompt) {
        // असली ब्राउज़र प्रॉम्प्ट दिखाएं
        installPrompt.prompt();
        
        // यूजर का फैसला चेक करें
        const { outcome } = await installPrompt.userChoice;
        console.log(`User response to install: ${outcome}`);
        
        // काम हो गया, अब पॉपअप छुपा दें
        closeInstallPopup();
        installPrompt = null;
    } else {
        // अगर प्रॉम्प्ट नहीं मिला (जैसे पहले से इंस्टॉल है या ब्राउज़र सपोर्ट नहीं करता)
        alert("SewaAstra पहले से इंस्टॉल है या आपका ब्राउज़र इसे सपोर्ट नहीं करता।");
        closeInstallPopup();
    }
});

function closeInstallPopup() {
    document.getElementById('hard-install-overlay').style.display = 'none';
}

// 3. चेक करें कि ऐप पहले से इंस्टॉल तो नहीं
window.addEventListener('appinstalled', () => {
    console.log('SewaAstra सफलतापूर्वक इंस्टॉल हो गया!');
    closeInstallPopup();
});
const self20Tools = [
    {n:"Age Calc", i:"🎂", id:"age"}, {n:"GST Calc", i:"💰", id:"gst"}, 
    {n:"Love Test", i:"❤️", id:"love"}, {n:"Day Finder", i:"📅", id:"day"},
    {n:"Word Count", i:"📝", id:"word"}, {n:"Discount", i:"🏷️", id:"disc"},
    {n:"Tip Calc", i:"💵", id:"tip"}, {n:"Stopwatch", i:"⏱️", id:"stop"},
    {n:"Coin Flip", i:"🪙", id:"coin"}, {n:"Dice Roll", i:"🎲", id:"dice"},
    {n:"Text-Talk", i:"🗣️", id:"speak"}, {n:"Case Swap", i:"Aa", id:"case"},
    {n:"Bmi Pro", i:"⚖️", id:"bmi"}, {n:"Fuel Cost", i:"⛽", id:"fuel"},
    {n:"Split Bill", i:"🍕", id:"split"}, {n:"Random No", i:"🔢", id:"rand"},
    {n:"Days Alive", i:"☀️", id:"alive"}, {n:"Binary", i:"📟", id:"bin"},
    {n:"Voter Age", i:"🗳️", id:"vote"}, {n:"Astra Help", i:"🚩", id:"help"}
];

function load20Tools() {
    let html = "";
    self20Tools.forEach(tool => {
        html += `
        <div class="card" onclick="openAstraTool('${tool.id}', '${tool.n}')" style="background: #fff9f3; border: 1px solid #ffe0b2;">
            <b>${tool.i}</b>
            <span>${tool.n}</span>
        </div>`;
    });
    document.getElementById('grid-20-tools').innerHTML = html;
}

function openAstraTool(id, name) {
    document.getElementById('tool-popup').style.display = 'flex';
    document.getElementById('tool-name').innerText = name;
    let ui = document.getElementById('tool-ui');
    
    // Quick Logic for some tools
    if(id === 'coin') {
        ui.innerHTML = `<h3>${Math.random() > 0.5 ? "HEADS 🪙" : "TAILS 🪙"}</h3>`;
    } else if(id === 'dice') {
        ui.innerHTML = `<h1 style="font-size:50px;">${Math.floor(Math.random() * 6) + 1} 🎲</h1>`;
    } else if(id === 'gst') {
        ui.innerHTML = `
            <input type="number" id="g-amt" class="search-box" placeholder="Amount डालें" style="border:1px solid #ddd;">
            <button class="btn-bhagwa" style="width:100%; margin-top:10px; padding:10px;" onclick="calcGst()">Calculate (18%)</button>
            <p id="g-res" style="margin-top:10px; font-weight:bold;"></p>`;
    } else if(id === 'speak') {
        ui.innerHTML = `
            <input type="text" id="t-voice" class="search-box" placeholder="Likho jo bulwana hai" style="border:1px solid #ddd;">
            <button class="btn-bhagwa" style="width:100%; margin-top:10px; padding:10px;" onclick="talkNow()">Speak 🗣️</button>`;
    } else if(id === 'love') {
        ui.innerHTML = `<h3>Love Score: ${Math.floor(Math.random() * 100)}% ❤️</h3>`;
    } else {
        ui.innerHTML = `<p>${name} is Ready! SewaAstra Engine processing...</p>`;
    }
}

// Sub-functions
function calcGst() {
    let a = document.getElementById('g-amt').value;
    document.getElementById('g-res').innerText = "Total: ₹" + (a * 1.18).toFixed(2);
}

function talkNow() {
    let t = document.getElementById('t-voice').value;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(t));
}

// Call this inside showScreen('home')
load20Tools();
