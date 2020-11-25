const canvas = document.getElementById('CanvasOne');
const context = canvas.getContext('2d');
var NumParticles = 100;
const MaxSizeParticles = 2;

context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

const ParticleArray = new Array();

// Create Constructor Function
function Particle(x, y, directionX, directionY, size, color)
{
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

Particle.prototype.draw = function()
{
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
}

Particle.prototype.update = function()
{
    if (this.x + this.size > window.innerWidth || this.x - this.size < 0)
    {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size > window.innerHeight)
    {
        this.y = 0;
    }

    this.size

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
}

// create Particle Array
function init() {
    ParticleArray.length = 0;
    NumParticles = (window.innerWidth / 11);
    Array.from(new Array(Math.round(NumParticles)), (x, i) => i).forEach(() => {
        let Size = Math.random() * MaxSizeParticles;
        let ParticleX = Math.random() * (innerWidth - Size * 2);
        let ParticleY = Math.random() * (innerHeight - Size * 2);
        let DirectionX = (Math.random() * .4) - .2;

        let DirectionY = (Math.random() * .2) + .1;
        let Color = 'white';

        ParticleArray.push(new Particle(ParticleX, ParticleY, DirectionX, DirectionY, Size, Color));
    });
}

// Animate
function animate()
{
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    for (let Particle of ParticleArray)
    {
        Particle.update();
    }
}

init();
animate();

window.onresize = function()
{
    init();
}