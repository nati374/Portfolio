const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

const velocityInput = document.getElementById("velocity");
const angleInput = document.getElementById("angle");
const gravityInput = document.getElementById("gravity");
const airResistanceInput = document.getElementById("airResistance");
const startButton = document.getElementById("start");
const clearButton = document.getElementById("clear");

let projectiles = [];
let graphData = {
    labels: [],
    datasets: [{
        label: 'Height over Time',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
    }]
};

const graphCanvas = document.getElementById("graphCanvas");
const graphCtx = graphCanvas.getContext("2d");
let chart = new Chart(graphCtx, {
    type: 'line',
    data: graphData,
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Height (m)'
                }
            }
        }
    }
});

class Projectile {
    constructor(v, angle, g, airResistance) {
        this.x = 50;
        this.y = canvas.height - 50;
        this.vx = v * Math.cos(angle * Math.PI / 180);
        this.vy = -v * Math.sin(angle * Math.PI / 180);
        this.g = g;
        this.airResistance = airResistance;
        this.time = 0;
        this.trail = [];
    }

    update() {
        this.x += this.vx * 0.1;
        this.y += this.vy * 0.1;
        this.vy += this.g * 0.1;

        // Air resistance: reduces velocity
        const resistanceX = this.airResistance * this.vx;
        const resistanceY = this.airResistance * this.vy;
        this.vx -= resistanceX;
        this.vy -= resistanceY;

        // Store trajectory for graph
        if (this.time % 1 === 0) {
            this.trail.push({ time: this.time, height: this.y });
            if (this.trail.length > 20) this.trail.shift();
        }

        this.time += 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        // Draw projectile trail
        this.trail.forEach((point, index) => {
            ctx.beginPath();
            ctx.arc(point.time * 10, point.height, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fill();
            ctx.closePath();
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    projectiles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.y > canvas.height - 50) {
            projectiles.splice(index, 1);
        }
    });

    // Update Graph
    graphData.labels = projectiles[0] ? projectiles[0].trail.map(p => p.time) : [];
    graphData.datasets[0].data = projectiles[0] ? projectiles[0].trail.map(p => p.height) : [];
    chart.update();

    requestAnimationFrame(animate);
}

startButton.addEventListener("click", () => {
    const v = parseFloat(velocityInput.value);
    const angle = parseFloat(angleInput.value);
    const g = parseFloat(gravityInput.value);
    const airResistance = parseFloat(airResistanceInput.value);

    projectiles.push(new Projectile(v, angle, g, airResistance));

    if (projectiles.length === 1) animate();
});

clearButton.addEventListener("click", () => {
    projectiles = [];
    graphData.labels = [];
    graphData.datasets[0].data = [];
    chart.update();
});