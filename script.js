 // 1. Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4kInzUxzF6Or1sHfzXavx1nVMOx4Olak",
    authDomain: "sewaastra.firebaseapp.com",
    projectId: "sewaastra",
    appId: "1:211091351218:web:5602f5f1a36a21c3464bab"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let deferredPrompt;

// 2. Data Arrays
const selfTools = [
    {n:"Age Calc", i:"🎂", id:"age"}, {n:"QR Gen", i:"📸", id:"qr"}, {n:"GST", i:"💰", id:"gst"}, 
    {n:"Coin", i:"🪙", id:"coin"}, {n:"Love", i:"❤️", id:"love"}, {n:"BMI", i:"⚖️", id:"bmi"},
    {n:"Text-Talk", i:"🗣️", id:"speak"}, {n:"Dice", i:"🎲", id:"dice"}, {n:"Note", i:"🗒️", id:"note"},
    {n:"Unit", i:"🔄", id:"unit"}, {n:"Fuel", i:"⛽", id:"fuel"}, {n:"Stopwatch", i:"⏱️", id:"stop"}
];

const finTools = [
    {n:"Aadhar", i:"🆔", u:"https://uidai.gov.in"}, {n:"PAN", i:"💳", u:"https://onlineservices.nsdl.com"},
    {n:"SIP", i:"📈", u:"https://groww.in"}, {n:"ITR", i:"📑", u:"https://eportal.incometax.gov.in"}
];

// 3. Core Logic
document.addEventListener('DOMContentLoaded', () => {
    // Login Button Event
    const loginBtn = document.getElementById('btn-login');
    if(loginBtn) {
        loginBtn.onclick = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithRedirect(provider);
        };
    }
});

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-layer').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        document.getElementById('user-photo-nav').src = user.photoURL;
        document.getElementById('user-photo-big').src = user.photoURL;
        document.getElementById('user-name-profile').innerText = user.displayName;
        document.getElementById('user-email-profile').innerText = user.email;
        showScreen('home');
        
        setTimeout(() => {
            if (deferredPrompt) document.getElementById('install-overlay').style.display = 'flex';
        }, 3000);
    }
});

function showScreen(screen) {
    document.getElementById('home-section').style.display = (screen === 'home' ? 'block' : 'none');
    document.getElementById('profile-section').style.display = (screen === 'profile' ? 'block' : 'none');
    document.getElementById('nav-home').classList.toggle('active', screen === 'home');
    document.getElementById('nav-profile').classList.toggle('active', screen === 'profile');
    if(screen === 'home') {
        renderGrid('grid-self', selfTools, true);
        renderGrid('grid-finance', finTools, false);
    }
}

function renderGrid(id, data, isSelf) {
    let html = "";
    data.forEach(t => {
        html += `<div class="card" onclick="${isSelf ? `openTool('${t.id}','${t.n}')` : `window.open('${t.u}')`}">
            <b>${t.i}</b><span>${t.n}</span>
        </div>`;
    });
    document.getElementById(id).innerHTML = html;
}

function openTool(id, name) {
    const modal = document.getElementById('tool-popup');
    const body = document.getElementById('tool-body');
    document.getElementById('tool-title').innerText = name;
    modal.style.display = 'flex';
    if(id === 'coin') body.innerHTML = `<h2>${Math.random() > 0.5 ? "HEADS 🪙" : "TAILS 🪙"}</h2>`;
    else body.innerHTML = `<p>${name} System loading...</p>`;
}

function shareApp() {
    if (navigator.share) {
        navigator.share({ title: 'SewaAstra', text: 'Check this Super App!', url: location.href });
    }
}

function logout() { auth.signOut().then(() => location.reload()); }

// 4. Exit & Install Events
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
document.getElementById('btn-real-install').onclick = () => {
    if(deferredPrompt) deferredPrompt.prompt();
    closeModal('install-overlay');
};

window.history.pushState(null, null, location.href);
window.onpopstate = () => document.getElementById('exit-modal').style.display = 'flex';

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function exitNow() { window.location.href = "about:blank"; }
