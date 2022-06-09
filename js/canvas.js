const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
context.strokeStyle = "red";
context.fillStyle = "rgba(0, 0, 255, 0.5)";
context.fillRect(10, 10, 100, 100);   
context.strokeRect(10, 10, 100, 100);
drawPattern();
drawGradient();
drawCircle();
determineLocation();

function drawPattern() {
    const canvas = document.getElementById("myCanvas2");
    const context = canvas.getContext("2d");
    context.strokeStyle = "red";

    const img = new Image(); 
    img.src = "../images/Picture2.jpg";
    img.onload = function () {
        const pattern = context.createPattern(img, "repeat"); 
        context.fillStyle = pattern;                        
        context.fillRect(10, 10, 100, 100);                  
        context.strokeRect(10, 10, 100, 100); 
    }
}

function drawGradient() {
    const canvas = document.getElementById("myCanvas3");
    const context = canvas.getContext("2d");
    context.strokeStyle = "red";
    const gradient = context.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "blue"); 
    gradient.addColorStop(1, "white"); 
    context.fillStyle = gradient; 
    context.fillRect(10, 10, 100, 100); 
    context.strokeRect(10, 10, 100, 100);
}

function drawCircle() {
    const canvas = document.getElementById("myCanvas4");
    const context = canvas.getContext("2d");
    context.beginPath();
    context.arc(50, 50, 30, 0, Math.PI*2, true);
    context.closePath(); 
    context.strokeStyle = "red";
    context.fillStyle = "blue";
    context.lineWidth = 3;
    context.fill(); 
    context.stroke();
}