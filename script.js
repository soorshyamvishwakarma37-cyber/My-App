 const firebaseConfig = {
    apiKey: "AIzaSyA4kInzUxzF6Or1sHfzXavx1nVMOx4Olak",
    authDomain: "sewaastra.firebaseapp.com",
    projectId: "sewaastra",
    appId: "1:211091351218:web:5602f5f1a36a21c3464bab"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- DATA ---
const self20 = [
    {n:"Age",i:"🎂"},{n:"QR",i:"📸"},{n:"GST",i:"💰"},{n:"Coin",i:"🪙"},{n:"Love",i:"❤️"},
    {n:"BMI",i:"⚖️"},{n:"Talk",i:"🗣️"},{n:"Dice",i:"🎲"},{n:"Note",i:"🗒️"},{n:"Unit",i:"🔄"},
    {n:"Fuel",i:"⛽"},{n:"Stopw",i:"⏱️"},{n:"Pass",i:"🔐"},{n:"Speed",i:"🚀"},{n:"Split",i:"🍕"},
    {n:"Days",i:"📅"},{n:"Help",i:"🚩"},{n:"Calc",i:"🧮"},{n:"Bhopal",i:"🚌"},{n:"Binary",i:"📟"}
];

// यहाँ मैंने 90 लिंक्स का स्ट्रक्चर दिया है, आप बस 'u' में असली लिंक भर दें
const govt30 = Array(30).fill({n:"Govt", i:"🆔", u:"https://uidai.gov.in"});
const edu30 = Array(30).fill({n:"Study", i:"📚", u:"https://google.com"});
const life30 = Array(30).fill({n:"Food", i:"🍔", u:"https://zomato.com"});

// --- CORE LOGIC ---
document.getElementById('btn-login').onclick = () => {
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
};

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-layer').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        document.getElementById('user-photo-nav').src = user.photoURL;
        renderAll();
    }
});

function renderAll() {
    renderGrid('grid-self', self20, true);
    renderGrid('grid-govt', govt30, false);
    renderGrid('grid-edu', edu30, false);
    renderGrid('grid-life', life30, false);
}

function renderGrid(id, data, isSelf) {
    let html = "";
    data.forEach((t, index) => {
        const name = isSelf ? t.n : t.n + (index + 1); // 1, 2, 3 numbering
        html += `<div class="card" onclick="${isSelf ? `alert('${name} Open')` : `window.open('${t.u}')`}">
            <b>${t.i}</b><span>${name}</span>
        </div>`;
    });
    document.getElementById(id).innerHTML = html;
}

function logout() { auth.signOut().then(() => location.reload()); }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onpopstate = () => document.getElementById('exit-modal').style.display = 'flex';
window.history.pushState(null, null, location.href);