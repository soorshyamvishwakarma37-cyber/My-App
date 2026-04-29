 // 1. Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. Data for 110 Tools
const selfTools = [
    {n:"Age", i:"🎂"}, {n:"QR", i:"📸"}, {n:"GST", i:"💰"}, {n:"Coin", i:"🪙"}, {n:"Love", i:"❤️"},
    {n:"BMI", i:"⚖️"}, {n:"Talk", i:"🗣️"}, {n:"Dice", i:"🎲"}, {n:"Note", i:"🗒️"}, {n:"Unit", i:"🔄"},
    {n:"Fuel", i:"⛽"}, {n:"Stopw", i:"⏱️"}, {n:"Pass", i:"🔐"}, {n:"Speed", i:"🚀"}, {n:"Split", i:"🍕"},
    {n:"Days", i:"📅"}, {n:"Help", i:"🚩"}, {n:"Calc", i:"🧮"}, {n:"Bus", i:"🚌"}, {n:"Bin", i:"📟"}
];

const govt30 = Array.from({length: 30}, (_, i) => ({n: "Govt "+(i+1), i: "🆔", u: "https://uidai.gov.in"}));
const edu30 = Array.from({length: 30}, (_, i) => ({n: "Study "+(i+1), i: "📚", u: "https://google.com"}));
const life30 = Array.from({length: 30}, (_, i) => ({n: "Service "+(i+1), i: "🛠️", u: "https://zomato.com"}));

// 3. Login Logic
const loginBtn = document.getElementById('btn-login');
if(loginBtn) {
    loginBtn.onclick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        // Redirect use kar rahe hain mobile reliability ke liye
        auth.signInWithRedirect(provider).catch(err => alert(err.message));
    };
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-layer').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        document.getElementById('user-photo-nav').src = user.photoURL;
        renderAll();
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
    data.forEach(t => {
        html += `<div class="card" onclick="${isSelf ? `alert('${t.n} Tool Active')` : `window.open('${t.u}')`}">
            <b>${t.i}</b><span>${t.n}</span>
        </div>`;
    });
    document.getElementById(id).innerHTML = html;
}

// 4. Utility Functions
function filterTools() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    for (let card of cards) {
        card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
    }
}

function logout() { auth.signOut().then(() => location.reload()); }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function exitNow() { window.location.href = "about:blank"; }

// Exit Modal Logic
window.history.pushState(null, null, location.href);
window.onpopstate = () => {
    document.getElementById('exit-modal').style.display = 'flex';
    window.history.pushState(null, null, location.href);
};