 // 1. Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_ID.firebaseapp.com",
    projectId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let deferredPrompt;

// 2. 110+ Tools Data
const selfTools = [
    {n:"Age", i:"🎂"}, {n:"QR", i:"📸"}, {n:"GST", i:"💰"}, {n:"Coin", i:"🪙"}, {n:"Love", i:"❤️"},
    {n:"BMI", i:"⚖️"}, {n:"Talk", i:"🗣️"}, {n:"Dice", i:"🎲"}, {n:"Note", i:"🗒️"}, {n:"Unit", i:"🔄"},
    {n:"Fuel", i:"⛽"}, {n:"Stopw", i:"⏱️"}, {n:"Pass", i:"🔐"}, {n:"Speed", i:"🚀"}, {n:"Split", i:"🍕"},
    {n:"Days", i:"📅"}, {n:"Help", i:"🚩"}, {n:"Calc", i:"🧮"}, {n:"Bus", i:"🚌"}, {n:"Bin", i:"📟"}
];

const govt30 = Array(30).fill({n:"Govt", i:"🆔", u:"https://uidai.gov.in"});
const edu30 = Array(30).fill({n:"Study", i:"📚", u:"https://google.com"});
const life30 = Array(30).fill({n:"Life", i:"🍔", u:"https://zomato.com"});

// 3. Auth & App Logic
document.getElementById('btn-login').onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
};

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-layer').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        document.getElementById('user-photo-nav').src = user.photoURL;
        renderAll();
        
        // Auto Install Popup after 3s
        setTimeout(() => {
            if (deferredPrompt) document.getElementById('install-overlay').style.display = 'flex';
        }, 3000);
    }
});

function renderAll() {
    renderGrid('grid-self', selfTools, true);
    renderGrid('grid-govt', govt30, false);
    renderGrid('grid-edu', edu30, false);
    renderGrid('grid-life', life30, false);
}

function renderGrid(id, data, isSelf) {
    let html = "";
    data.forEach((t, i) => {
        const name = isSelf ? t.n : t.n + " " + (i + 1);
        html += `<div class="card" onclick="${isSelf ? `alert('${name} Coming Soon')` : `window.open('${t.u}')`}">
            <b>${t.i}</b><span>${name}</span>
        </div>`;
    });
    document.getElementById(id).innerHTML = html;
}

// 4. PWA & Exit Logic
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

document.getElementById('btn-real-install').onclick = () => {
    if(deferredPrompt) deferredPrompt.prompt();
    closeModal('install-overlay');
};

window.history.pushState(null, null, location.href);
window.onpopstate = () => {
    document.getElementById('exit-modal').style.display = 'flex';
    window.history.pushState(null, null, location.href);
};

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function exitNow() { window.location.href = "about:blank"; }
function logout() { auth.signOut().then(() => location.reload()); }
