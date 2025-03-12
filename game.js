// CANVAS
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const bg = document.getElementById('bg');
bg.src = "images\\bg.png";
const width = 800;
const height = 600;
canvas.width = width;
canvas.height = height;

//   SETUP SCORE
let score = 0;

//   SETUP BIRD
const bird = document.getElementById('bird');
let bird_x = 90;
let bird_y = 250;

//   SETUP PIPES
const pipeTop = document.getElementById('pipeTop');
const pipeBottom = document.getElementById('pipeBottom');
let gap = 100
let pipeTop_x = width-50
let pipeTop_y = 0 - pipeTop.height/2 - gap
let pipeBottom_x = width-50
let pipeBottom_y = pipeBottom.height/2 + gap
console.log(pipeTop_x, pipeTop_y, pipeBottom_x, pipeBottom_y)
pipeBottom.addEventListener("load", draw);
const gravity = 1;

//   BUTTON PRESSES
function on_mouse_down() {
    bird_y = bird_y - 50
}

//   DRAW STUFF TO SCREEN
function  draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bird, bird_x, bird_y);
    ctx.drawImage(pipeTop, pipeTop_x, pipeTop_y);
    ctx.drawImage(pipeBottom, pipeBottom_x, pipeBottom_y);
    ctx.font = "48px Arial bold";
    ctx.fillStyle = "orange";
    ctx.fillText(score, 750, 550);
  }

//   UPDATE GAME
function update() {
    bird_y += gravity;
    pipeTop_x -= 1;
    pipeBottom_x -= 1;
    // update pipes and check for collision wih left side of screen
    if (pipeTop_x < 0) {
        pipeTop_x = width;
        pipeBottom_x = width;
        score += 1;
    }
    // check for collision with bird
    if (bird_y > height || 
        bird_y < 0 || 
        (bird_x + bird.width > pipeTop_x 
            && bird_x < pipeTop_x + pipeTop.width 
            && (bird_y < pipeTop_y + pipeTop.height 
                || bird_y + bird.height > pipeBottom_y))) {
        reset();
    }

    draw();
  }

//   RESET GAME
function reset() {
    score = 0;
    bird_y = 250;
    pipeTop_x = width-50;
    pipeBottom_x = width-50;
    gap = Math.random() * 100 + 50;
    pipeTop_y = 0 - pipeTop.height/2 - gap;

    pipeBottom_y = pipeBottom.height/2 + gap;
  }

//   RUN GAME
setInterval(update, 10);
canvas.addEventListener("mousedown", on_mouse_down);
  