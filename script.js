// =========================
// Lucky Spin
// Version 1.0
// =========================

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const prizes = [
    "Rp10K",
    "Rp20K",
    "Rp50K",
    "Rp70K",
    "Rp100K",
    "Rp150K",
    "Rp175K",
    "Rp200K"
];

const colors = [
    "#ff6b6b",
    "#feca57",
    "#48dbfb",
    "#1dd1a1",
    "#5f27cd",
    "#ee5253",
    "#10ac84",
    "#ff9f43"
];

const total = prizes.length;
const arc = (Math.PI * 2) / total;

let currentRotation = 0;
let spinning = false;

// =========================
// Draw Wheel
// =========================

function drawWheel() {

    for (let i = 0; i < total; i++) {

        const angle = i * arc;

        ctx.beginPath();

        ctx.moveTo(250,250);

        ctx.arc(
            250,
            250,
            250,
            angle,
            angle + arc
        );

        ctx.fillStyle = colors[i];

        ctx.fill();

        ctx.save();

        ctx.translate(250,250);

        ctx.rotate(angle + arc / 2);

        ctx.fillStyle = "white";

        ctx.font = "bold 22px Poppins";

        ctx.textAlign = "right";

        ctx.fillText(prizes[i],220,8);

        ctx.restore();

    }

    // center

    ctx.beginPath();

    ctx.arc(250,250,40,0,Math.PI*2);

    ctx.fillStyle="#ffffff";

    ctx.fill();

}

drawWheel();

// =========================
// Spin
// =========================

spinBtn.onclick = () => {

    if(spinning) return;

    spinning = true;

    spinBtn.disabled = true;

    result.innerHTML = "Spinning...";

    const randomIndex = Math.floor(Math.random()*total);

    const stopAngle = (360/total)*randomIndex;

    const rotate =
    360*6 + (360-stopAngle);

    currentRotation += rotate;

    canvas.style.transform =
    `rotate(${currentRotation}deg)`;

    setTimeout(()=>{

        spinning=false;

        spinBtn.disabled=false;

        result.innerHTML=
        "🎉 "+prizes[randomIndex];

        confetti({

            particleCount:180,

            spread:120,

            origin:{
                y:.6
            }

        });

    },6000);

}
