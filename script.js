 // 1. CONFIG & AUTH
const firebaseConfig = {
    apiKey: "AIzaSyA4kInzUxzF6Or1sHfzXavx1nVMOx4Olak",
    authDomain: "sewaastra.firebaseapp.com",
    projectId: "sewaastra",
    appId: "1:211091351218:web:5602f5f1a36a21c3464bab"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let deferredPrompt;

// Login Logic
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider); // Mobile-friendly redirect
}

function logout() { auth.signOut().then(() => location.reload()); }

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-layer').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        document.getElementById('user-name-profile').innerText = user.displayName;
        document.getElementById('user-email-profile').innerText = user.email;
        document.getElementById('user-photo-nav').src = user.photoURL;
        document.getElementById('user-photo-big').src = user.photoURL;
        showScreen('home');
        
        // Show Install Popup
        setTimeout(() => {
            if (deferredPrompt) document.getElementById('hard-install-overlay').style.display = 'flex';
        }, 3000);
    }
});

// 2. TOOLS DATA
const selfTools = [
    {n:"Age Calc", i:"🎂", id:"age"}, {n:"GST Calc", i:"💰", id:"gst"}, {n:"Love Test", i:"❤️", id:"love"},
    {n:"QR Gen", i:"📸", id:"qr"}, {n:"Coin Flip", i:"🪙", id:"coin"}, {n:"Dice Roll", i:"🎲", id:"dice"},
    {n:"Text-Talk", i:"🗣️", id:"speak"}, {n:"Stopwatch", i:"⏱️", id:"stop"}, {n:"BMI Pro", i:"⚖️", id:"bmi"},
    {n:"Word Count", i:"📝", id:"word"}, {n:"Bhopal Bus", i:"🚌", id:"bus"}, {n:"Fuel Cost", i:"⛽", id:"fuel"},
    {n:"Note Save", i:"🗒️", id:"note"}, {n:"Day Finder", i:"📅", id:"day"}, {n:"Unit Conv", i:"🔄", id:"unit"},
    {n:"Split Bill", i:"🍕", id:"split"}, {n:"Discount", i:"🏷️", id:"disc"}, {n:"Speed Test", i:"🚀", id:"speed"},
    {n:"Password", i:"🔐", id:"pass"}, {n:"Astra Help", i:"🚩", id:"help"}
];

const tools1 = [
    {n:"Aadhar", i:"🆔", u:"https://uidai.gov.in"}, {n:"PAN", i:"💳", u:"https://onlineservices.nsdl.com"},
    {n:"SIP", i:"📈", u:"https://groww.in"}, {n:"GST", i:"📊", u:"https://cleartax.in"},
    {n:"ITR", i:"📑", u:"https://eportal.incometax.gov.in"}, {n:"Speed", i:"⚡", u:"https://fast.com"}
    // ...Add others here
];

// 3. CORE FUNCTIONS
function renderGrid(id, data, isSelf) {
    let html = "";
    data.forEach(t => {
        html += `<div class="card" onclick="${isSelf ? `openTool('${t.id}','${t.n}')` : `window.open('${t.u}')`}">
            <b>${t.i}</b><span>${t.n}</span>
        </div>`;
    });
    document.getElementById(id).innerHTML = html;
}

function showScreen(screen) {
    document.getElementById('home-section').style.display = (screen === 'home' ? 'block' : 'none');
    document.getElementById('profile-section').style.display = (screen === 'profile' ? 'block' : 'none');
    document.getElementById('nav-home').classList.toggle('active', screen === 'home');
    document.getElementById('nav-profile').classList.toggle('active', screen === 'profile');
    if(screen === 'home') {
        renderGrid('grid-self-20', selfTools, true);
        renderGrid('grid-finance', tools1, false);
        // Load others...
    }
}

function openTool(id, name) {
    const modal = document.getElementById('tool-popup');
    const body = document.getElementById('tool-body');
    document.getElementById('tool-title').innerText = name;
    modal.style.display = 'flex';
    
    if(id === 'coin') body.innerHTML = `<h2>${Math.random() > 0.5 ? "HEADS 🪙" : "TAILS 🪙"}</h2>`;
    else if(id === 'speak') body.innerHTML = `<input type="text" id="v-t" class="search-box" placeholder="Write..."><button onclick="speakNow()" class="btn-bhagwa" style="width:100%; margin-top:10px;">Speak</button>`;
    else if(id === 'qr') body.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=SewaAstra" style="width:150px;">`;
    else body.innerHTML = `<p>${name} System is active.</p>`;
}

function speakNow() {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(document.getElementById('v-t').value));
}

function shareApp() {
    if (navigator.share) {
        navigator.share({ title: 'SewaAstra', text: 'Bhopal की सुपर ऐप!', url: location.href });
    }
}

// 4. BROWSER EVENTS (Exit & Install)
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
document.getElementById('btn-real-install').onclick = () => {
    if(deferredPrompt) deferredPrompt.prompt();
    closeModal('hard-install-overlay');
};

window.history.pushState(null, null, location.href);
window.onpopstate = () => document.getElementById('exit-modal').style.display = 'flex';

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function exitNow() { window.location.href = "about:blank"; }