 let deferredPrompt;

// 1. Tool Data Arrays
const selfTools = [
    {n:"Age Calc", i:"🎂"}, {n:"QR Gen", i:"📸"}, {n:"GST Calc", i:"💰"}, {n:"Coin Flip", i:"🪙"}, {n:"Love %", i:"❤️"},
    {n:"BMI", i:"⚖️"}, {n:"Speak", i:"🗣️"}, {n:"Dice", i:"🎲"}, {n:"Notes", i:"🗒️"}, {n:"Units", i:"🔄"},
    {n:"Petrol", i:"⛽"}, {n:"Timer", i:"⏱️"}, {n:"Pass Gen", i:"🔐"}, {n:"Speed", i:"🚀"}, {n:"Split", i:"🍕"},
    {n:"Calendar", i:"📅"}, {n:"SOS", i:"🚩"}, {n:"Scientific", i:"🧮"}, {n:"Bus Track", i:"🚌"}, {n:"Hex Code", i:"📟"},
    {n:"Morse", i:"📻"}, {n:"Base64", i:"🔗"}, {n:"IP Info", i:"🌐"}, {n:"Battery", i:"🔋"}, {n:"Storage", i:"📂"},
    {n:"Compass", i:"🧭"}, {n:"Flash", i:"🔦"}, {n:"Magnify", i:"🔍"}, {n:"Level", i:"📏"}, {n:"Counter", i:"🔢"},
    {n:"Weather", i:"☁️"}, {n:"Habit", i:"📈"}, {n:"Mood", i:"😊"}, {n:"Clock", i:"🕒"}, {n:"Alarm", i:"⏰"},
    {n:"Drawing", i:"🎨"}, {n:"Reminder", i:"🔔"}, {n:"To-Do", i:"✅"}, {n:"Tip Calc", i:"💵"}, {n:"Discount", i:"🏷️"},
    {n:"Translator", i:"🏮"}, {n:"Stopwatch", i:"⌚"}, {n:"Vibrate", i:"📳"}, {n:"Percent", i:"📉"}, {n:"Calorie", i:"🥗"},
    {n:"Water", i:"💧"}, {n:"Sleep", i:"🌙"}, {n:"Air Qual", i:"🍃"}, {n:"Biorhythm", i:"📉"}, {n:"Step Count", i:"👟"}
];

const govtTools = [
    {n:"Aadhar", i:"🆔"}, {n:"PAN", i:"💳"}, {n:"Voter", i:"🗳️"}, {n:"Passport", i:"🛂"}, {n:"Driving", i:"🚗"},
    {n:"Ration", i:"🌾"}, {n:"Pension", i:"👴"}, {n:"Scholar", i:"🎓"}, {n:"Income", i:"💵"}, {n:"Caste", i:"📜"},
    {n:"DigiLocker", i:"📂"}, {n:"e-Shram", i:"🏗️"}, {n:"PM Kisan", i:"🚜"}, {n:"Gas Book", i:"🔥"}, {n:"Bill Pay", i:"⚡"},
    {n:"EPFO", i:"🏦"}, {n:"Ayushman", i:"🏥"}, {n:"Court", i:"⚖️"}, {n:"Police", i:"🚔"}, {n:"Train", i:"🚆"},
    {n:"Property", i:"🏠"}, {n:"Marriage", i:"💍"}, {n:"Birth Cert", i:"👶"}, {n:"Death Cert", i:"⚰️"}, {n:"Trade", i:"🏭"},
    {n:"Startup", i:"🚀"}, {n:"Water", i:"💧"}, {n:"Land Map", i:"🗺️"}, {n:"Income Tax", i:"📈"}, {n:"E-Filing", i:"📂"},
    {n:"Sarkari", i:"🏛️"}, {n:"Awas", i:"🏠"}, {n:"Kisan Call", i:"👨‍🌾"}, {n:"NREGA", i:"🔨"}, {n:"Jobs", i:"💼"}
];

const eduTools = [
    {n:"Library", i:"📚"}, {n:"Results", i:"📊"}, {n:"Courses", i:"💻"}, {n:"Exams", i:"📝"}, {n:"Syllabus", i:"📖"},
    {n:"Resume", i:"📄"}, {n:"GK Quiz", i:"🧠"}, {n:"English", i:"🔤"}, {n:"Python", i:"🐍"}, {n:"Java", i:"☕"},
    {n:"HTML", i:"🌐"}, {n:"AI Chat", i:"🤖"}, {n:"College", i:"🏫"}, {n:"School", i:"🎒"}, {n:"Space", i:"🚀"},
    {n:"News", i:"🗞️"}, {n:"Typing", i:"⌨️"}, {n:"Editor", i:"🎞️"}, {n:"Cloud", i:"☁️"}, {n:"Cyber", i:"🛡️"},
    {n:"Physics", i:"⚛️"}, {n:"Chem", i:"🧪"}, {n:"Biology", i:"🧬"}, {n:"History", i:"🏺"}, {n:"Geo", i:"🌍"},
    {n:"UPSC", i:"👮"}, {n:"SSC", i:"📋"}, {n:"Novel", i:"📔"}, {n:"Podcast", i:"🎙️"}, {n:"Maths", i:"📐"},
    {n:"Degree", i:"📜"}, {n:"Intern", i:"🏢"}, {n:"Skill", i:"🛠️"}, {n:"Lecture", i:"📹"}, {n:"Notes", i:"✍️"}
];

const lifeTools = [
    {n:"Zomato", i:"🍕"}, {n:"Swiggy", i:"🍔"}, {n:"Hotel", i:"🏨"}, {n:"Flight", i:"✈️"}, {n:"Uber", i:"🚕"},
    {n:"Amazon", i:"📦"}, {n:"Flipkart", i:"🛍️"}, {n:"Netflix", i:"🎬"}, {n:"Spotify", i:"🎵"}, {n:"Cricket", i:"🏏"},
    {n:"Games", i:"🎮"}, {n:"Maps", i:"📍"}, {n:"Recipe", i:"🍲"}, {n:"Gym", i:"🏋️"}, {n:"Yoga", i:"🧘"},
    {n:"Doctor", i:"👨‍⚕️"}, {n:"Pharmacy", i:"🧪"}, {n:"Saloon", i:"✂️"}, {n:"Plumber", i:"🔧"}, {n:"Electric", i:"🔌"},
    {n:"Gardening", i:"🌳"}, {n:"Astrology", i:"🔮"}, {n:"Event", i:"🎟️"}, {n:"Dating", i:"💖"}, {n:"Recharge", i:"📱"},
    {n:"Insurance", i:"🛡️"}, {n:"Tickets", i:"🎫"}, {n:"Furniture", i:"🛋️"}, {n:"Rent", i:"🔑"}, {n:"Laundry", i:"🧺"}
];

// 2. Logic Functions
function enterApp() {
    document.getElementById('welcome-layer').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
    renderAll();

    // Trigger Install Popup Immediately after Login/Enter
    setTimeout(() => {
        if (deferredPrompt) {
            document.getElementById('install-modal').style.display = 'flex';
        }
    }, 800);
}

function renderAll() {
    renderGrid('grid-self', selfTools, true);
    renderGrid('grid-govt', govtTools, false);
    renderGrid('grid-edu', eduTools, false);
    renderGrid('grid-life', lifeTools, false);
}

function renderGrid(id, data, isSelf) {
    let html = "";
    data.forEach(t => {
        html += `<div class="card" onclick="${isSelf ? `alert('${t.n} Active!')` : `window.open('https://google.com/search?q=${t.n}')`}">
            <div class="icon-box">${t.i}</div>
            <div class="name-box">${t.n}</div>
        </div>`;
    });
    document.getElementById(id).innerHTML = html;
}

// 3. PWA & Systematic Exit
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function triggerInstall() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
    } else {
        alert("App is already installed or your browser doesn't support it.");
    }
}

document.getElementById('btn-install-now').onclick = triggerInstall;

// Systematic Exit on Back Button
window.history.pushState(null, null, location.href);
window.onpopstate = () => {
    document.getElementById('exit-modal').style.display = 'flex';
    window.history.pushState(null, null, location.href);
};

function shareApp() {
    if (navigator.share) {
        navigator.share({ title: 'SewaAstra', text: '150+ Tools in one app!', url: window.location.href });
    }
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function toggleMenu() { document.getElementById('side-menu').classList.toggle('active'); }
function exitNow() { window.location.href = "about:blank"; }

function filterTools() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    for (let card of cards) {
        card.style.display = card.innerText.toLowerCase().includes(input) ? "flex" : "none";
    }
}