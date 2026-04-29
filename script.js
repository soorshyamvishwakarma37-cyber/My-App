// 1. Firebase Config
firebase.initializeApp({
    apiKey: "AIzaSyA4kInzUxzF6Or1sHfzXavx1nVMOx4Olak",
    authDomain: "sewaastra.firebaseapp.com",
    projectId: "sewaastra",
    appId: "1:211091351218:web:5602f5f1a36a21c3464bab"
});

const auth = firebase.auth();
let deferredPrompt;

// 2. Auth Logic
function googleLogin() {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}
function logout() { auth.signOut().then(() => location.reload()); }

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-layer').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        document.getElementById('user-name').innerText = user.displayName;
        document.getElementById('user-email').innerText = user.email;
        document.getElementById('user-photo-nav').src = user.photoURL;
        document.getElementById('user-photo-nav').style.display = 'block';
        document.getElementById('user-photo-big').src = user.photoURL;
        showScreen('home');
        
        // Entry पर Install Popup
        setTimeout(() => {
            if (deferredPrompt) document.getElementById('hard-install-overlay').style.display = 'flex';
        }, 3000);
    }
});

// 3. Data & Render
const selfTools = [
    {n:"Age Calc", i:"🎂", id:"age"}, {n:"GST", i:"💰", id:"gst"}, {n:"Coin Flip", i:"🪙", id:"coin"},
    {n:"QR Gen", i:"📸", id:"qr"}, {n:"Text-Talk", i:"🗣️", id:"speak"}, {n:"Love Test", i:"❤️", id:"love"},
    {n:"Word Count", i:"📝", id:"word"}, {n:"BMI Calc", i:"⚖️", id:"bmi"}, {n:"Dice", i:"🎲", id:"dice"},
    {n:"Stopwatch", i:"⏱️", id:"stop"}, {n:"Note Save", i:"🗒️", id:"note"}, {n:"Bhopal Bus", i:"🚌", id:"bus"},
    {n:"Fuel Price", i:"⛽", id:"fuel"}, {n:"Speed Test", i:"🚀", id:"speed"}, {n:"Days Alive", i:"☀️", id:"days"},
    {n:"Astra Help", i:"🚩", id:"help"}, {n:"Binary", i:"📟", id:"bin"}, {n:"Split Bill", i:"🍕", id:"split"},
    {n:"Password", i:"🔐", id:"pass"}, {n:"Unit Conv", i:"🔄", id:"unit"}
];

const finTools = [{n:"GST", i:"📊", u:"https://cleartax.in"}, {n:"SIP", i:"📈", u:"https://groww.in"}, {n:"Aadhar", i:"🆔", u:"https://uidai.gov.in"}]; // बाकी 90 यहाँ जोड़ें

function showScreen(screen) {
    document.getElementById('home-section').style.display = (screen === 'home' ? 'block' : 'none');
    document.getElementById('profile-section').style.display = (screen === 'profile' ? 'block' : 'none');
    document.getElementById('nav-home').classList.toggle('active', screen === 'home');
    document.getElementById('nav-profile').classList.toggle('active', screen === 'profile');
    if(screen === 'home') renderAll();
}

function renderAll() {
    renderGrid('grid-self-20', selfTools, true);
    renderGrid('grid-finance', finTools, false);
}

function renderGrid(id, data, isSelf) {
    let html = "";
    data.forEach(t => {
        html += `<div class="card" onclick="${isSelf ? `openTool('${t.id}','${t.n}')` : `window.open('${t.u}')`}"><b>${t.i}</b><span>${t.n}</span></div>`;
    });
    document.getElementById(id).innerHTML = html;
}

// 4. Tools & Features
function openTool(id, name) {
    const modal = document.getElementById('tool-popup');
    document.getElementById('tool-title').innerText = name;
    const body = document.getElementById('tool-body');
    modal.style.display = 'flex';
    if(id === 'coin') body.innerHTML = `<h2>${Math.random() > 0.5 ? "HEADS 🪙" : "TAILS 🪙"}</h2>`;
    else if(id === 'qr') body.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=SewaAstra">`;
    else body.innerHTML = `<p>${name} is loading...</p>`;
}

function shareApp() {
    navigator.share({ title: 'SewaAstra', text: 'Check this Super App!', url: location.href });
}

// 5. Exit & Install Logic
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
document.getElementById('btn-real-install').onclick = () => {
    deferredPrompt.prompt();
    closeModal('hard-install-overlay');
};

window.history.pushState(null, null, location.href);
window.onpopstate = () => document.getElementById('exit-modal').style.display = 'flex';
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function exitNow() { window.location.href = "about:blank"; }