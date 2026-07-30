/* ==========================================
   LuckyVerse v1.0
   SCRIPT PART 1
========================================== */

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const spinBtn = document.getElementById("spinBtn");
const checkBtn = document.getElementById("checkBtn");
const userInput = document.getElementById("userID");

const popup = document.getElementById("popup");
const popupUser = document.getElementById("popupUser");
const popupPrize = document.getElementById("popupPrize");

const loading = document.getElementById("loading");

let currentUser = "";

let canSpin = false;

let rotation = 0;

/* ===========================
   Prize List
=========================== */

const prizes = [

    {
        text:"Rp500.000",
        color:"#ffb703"
    },

    {
        text:"Voucher 100K",
        color:"#3a86ff"
    },

    {
        text:"Try Again",
        color:"#ef476f"
    },

    {
        text:"Rp50.000",
        color:"#06d6a0"
    },

    {
        text:"Gift Box",
        color:"#8338ec"
    },

    {
        text:"Voucher 50K",
        color:"#118ab2"
    },

    {
        text:"Bonus Spin",
        color:"#fb8500"
    },

    {
        text:"Rp100.000",
        color:"#2ec4b6"
    }

];

/* ===========================
   Draw Wheel
=========================== */

function drawWheel(){

    const total = prizes.length;

    const arc = (Math.PI * 2) / total;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    prizes.forEach((item,index)=>{

        const angle = index * arc + rotation;

        ctx.beginPath();

        ctx.moveTo(250,250);

        ctx.arc(

            250,
            250,
            240,
            angle,
            angle + arc

        );

        ctx.fillStyle = item.color;

        ctx.fill();

        ctx.save();

        ctx.translate(250,250);

        ctx.rotate(angle + arc/2);

        ctx.textAlign="right";

        ctx.fillStyle="#ffffff";

        ctx.font="bold 18px Poppins";

        ctx.fillText(

            item.text,

            205,

            8

        );

        ctx.restore();

    });

    ctx.beginPath();

    ctx.arc(

        250,
        250,
        40,
        0,
        Math.PI*2

    );

    ctx.fillStyle="#07111f";

    ctx.fill();

}

/* ===========================
   Loading
=========================== */

window.addEventListener("load",()=>{

    drawWheel();

    setTimeout(()=>{

        loading.classList.add("hide");

    },1500);

});

/* ===========================
   Check User ID
=========================== */

checkBtn.addEventListener("click",()=>{

    const id = userInput.value.trim();

    if(id.length < 4){

        alert("Please enter valid User ID.");

        return;

    }

    currentUser = id;

    canSpin = true;

    checkBtn.innerHTML = "ID VERIFIED ✅";

    checkBtn.disabled = true;

});

/* ===========================
   Spin Button
=========================== */

let spinning = false;

spinBtn.addEventListener("click", () => {

    if (!canSpin) {

        showToast("Please verify your User ID first.");

        return;

    }

    if (spinning) return;

    spinning = true;

    spinBtn.disabled = true;

    const prizeIndex = Math.floor(Math.random() * prizes.length);

    const arc = (Math.PI * 2) / prizes.length;

    const targetAngle =
        (Math.PI * 2 * 6) +
        ((Math.PI * 2) - (prizeIndex * arc + arc / 2));

    const start = rotation;

    const duration = 5000;

    const startTime = performance.now();

    function animate(now) {

        const elapsed = now - startTime;

        const progress = Math.min(elapsed / duration, 1);

        const ease =
            1 - Math.pow(1 - progress, 4);

        rotation = start + (targetAngle - start) * ease;

        drawWheel();

        if (progress < 1) {

            requestAnimationFrame(animate);

        } else {

            spinning = false;

            spinBtn.disabled = false;

            showWinner(prizeIndex);

        }

    }

    requestAnimationFrame(animate);

});
function showWinner(index){

    popupUser.innerHTML = currentUser;

    popupPrize.innerHTML = prizes[index].text;

    popup.classList.add("show");

    updateStats();

}
const claimBtn = document.getElementById("claimBtn");

claimBtn.onclick = () => {

    popup.classList.remove("show");

    canSpin = false;

    checkBtn.disabled = false;

    checkBtn.innerHTML = "CHECK ID";

    userInput.value = "";

};
let totalSpin = 0;

let totalWinner = 0;

function updateStats(){

    totalSpin++;

    totalWinner++;

    document.getElementById("totalSpin").innerHTML =
        totalSpin;

    document.getElementById("winnerCount").innerHTML =
        totalWinner;

}
function showToast(text){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = text;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },10);

    setTimeout(()=>{

        toast.remove();

    },2500);

}
