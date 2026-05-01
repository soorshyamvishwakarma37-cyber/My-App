 let deferredPrompt;

// 1. Tool Data with Related Icons
const selfTools = [
    {n:"Age Calc", i:"🎂"}, {n:"QR Maker", i:"📸"}, {n:"GST Calc", i:"💰"}, {n:"Flip Coin", i:"🪙"}, {n:"Love Meter", i:"❤️"},
    {n:"BMI Check", i:"⚖️"}, {n:"Text/Voice", i:"🗣️"}, {n:"Dice Roll", i:"🎲"}, {n:"Notes", i:"🗒️"}, {n:"Converter", i:"🔄"},
    {n:"Petrol", i:"⛽"}, {n:"Timer", i:"⏱️"}, {n:"Passwords", i:"🔐"}, {n:"Speed Test", i:"🚀"}, {n:"Bill Split", i:"🍕"},
    {n:"Calendar", i:"📅"}, {n:"SOS Help", i:"🚩"}, {n:"Math Calc", i:"🧮"}, {n:"Bus Track", i:"🚌"}, {n:"Binary", i:"📟"}
];

const govtTools = [
    {n:"Aadhar", i:"🆔"}, {n:"PAN Card", i:"💳"}, {n:"Voter ID", i:"🗳️"}, {n:"Passport", i:"🛂"}, {n:"Driving", i:"🚗"},
    {n:"Ration", i:"🌾"}, {n:"Pension", i:"👴"}, {n:"Scholar", i:"🎓"}, {n:"Income", i:"💵"}, {n:"Caste", i:"📜"},
    {n:"DigiLocker", i:"📂"}, {n:"e-Shram", i:"🏗️"}, {n:"PM Kisan", i:"🚜"}, {n:"Gas Book", i:"🔥"}, {n:"Bill Pay", i:"⚡"},
    {n:"EPFO", i:"🏦"}, {n:"Ayushman", i:"🏥"}, {n:"Court", i:"⚖️"}, {n:"Police", i:"🚔"}, {n:"Train", i:"🚆"},
    {n:"Health", i:"💊"}, {n:"Property", i:"🏠"}, {n:"Water", i:"💧"}, {n:"License", i:"🎫"}, {n:"Startup", i:"🚀"},
    {n:"Labour", i:"👷"}, {n:"Awas Yoj", i:"🏚️"}, {n:"Marriage", i:"💍"}, {n:"Death Cert", i:"⚰️"}, {n:"Birth Cert", i:"👶"}
];

const eduTools = [
    {n:"Library", i:"📚"}, {n:"Results", i:"📊"}, {n:"Courses", i:"💻"}, {n:"Exam Date", i:"📝"}, {n:"Syllabus", i:"📖"},
    {n:"Jobs", i:"💼"}, {n:"Resume", i:"📄"}, {n:"Notes", i:"✍️"}, {n:"GK Quiz", i:"🧠"}, {n:"English", i:"🔤"},
    {n:"Python", i:"🐍"}, {n:"Java", i:"☕"}, {n:"HTML", i:"🌐"}, {n:"Design", i:"🎨"}, {n:"AI Tool", i:"🤖"},
    {n:"College", i:"🏫"}, {n:"School", i:"🎒"}, {n:"History", i:"🏺"}, {n:"Science", i:"🔬"}, {n:"Maths", i:"📐"},
    {n:"Space", i:"🚀"}, {n:"News", i:"🗞️"}, {n:"Magz", i:"📔"}, {n:"Scholar", i:"🎖️"}, {n:"Typing", i:"⌨️"},
    {n:"Editor", i:"🎞️"}, {n:"Cloud", i:"☁️"}, {n:"Database", i:"🗄️"}, {n:"Network", i:"📡"}, {n:"Security", i:"🛡️"}
];

const lifeTools = [
    {n:"Zomato", i:"🍕"}, {n:"Swiggy", i:"🍔"}, {n:"Booking", i:"🏨"}, {n:"Flights", i:"✈️"}, {n:"Uber", i:"🚕"},
    {n:"Amazon", i:"📦"}, {n:"Flipkart", i:"🛍️"}, {n:"Netflix", i:"🎬"}, {n:"Spotify", i:"🎵"}, {n:"Cricket", i:"🏏"},
    {n:"Games", i:"🎮"}, {n:"Weather", i:"⛅"}, {n:"Maps", i:"📍"}, {n:"Recipe", i:"🍲"}, {n:"Gym", i:"🏋️"},
    {n:"Yoga", i:"🧘"}, {n:"Doctor", i:"👨‍⚕️"}, {n:"Pharmacy", i:"🧪"}, {n:"Saloon", i:"✂️"}, {n:"Plumber", i:"🔧"},
    {n:"Electric", i:"🔌"}, {n:"Cleaning", i:"🧹"}, {n:"Gardening", i:"🌳"}, {n:"Tailor", i:"🪡"}, {n:"Astrology", i:"🔮"},
    {n:"Pets", i:"🐕"}, {n:"Events", i:"🎟️"}, {n:"Dating", i:"💖"}, {n:"Recharge", i:"📱"}, {n:"Insurance", i:"🛡️"}
];

// 2. Direct Login Function
function instantLogin() {
    const name = document.getElementById('user-name').value;
    const phone = document.getElementById('user-phone').value;

    if (name.length > 2 && phone.length === 10) {
        document.getElementById('login-layer').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        
        // Update Sidebar Info
        document.getElementById('display-name').innerText = name;
        document.getElementById('avatar-init').innerText = name.charAt(0).toUpperCase();
        
        renderAll();

        // 3. Trigger Install Popup Immediately After Login
        if (deferredPrompt) {
            setTimeout(() => {
                document.getElementById('install-modal').style.display = 'flex';
            }, 500);
        }
    } else {
        alert("कृपया अपना सही नाम और 10 अंकों का मोबाइल नंबर डालें।");
    }
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
        html += `<div class="card" onclick="${isSelf ? `alert('${t.n} Active!')` : `window.open('https://www.google.com/search?q=${t.n}')`}">
            <b>${t.i}</b><span>${t.n}</span>
        </div>`;
    });
    document.getElementById(id).innerHTML = html;
}

// 4. PWA Install Logic
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

document.getElementById('btn-install-now').onclick = () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        closeModal('install-modal');
    }
};

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function toggleMenu() { document.getElementById('side-menu').classList.toggle('active'); }

function filterTools() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    for (let card of cards) {
        card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
    }
}