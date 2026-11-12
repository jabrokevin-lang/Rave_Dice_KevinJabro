// Startar Pixi med en mörk bakgrund
const app = new PIXI.Application();
await app.init({ resizeTo: window, background: "#2f142eff" });
document.body.appendChild(app.canvas);

const particles = [];
const colors = [0xff44cc, 0x00bbcc, 0xffaa00, 0x7733ff];

// Skapar 30 partiklar där man klickar
window.addEventListener("pointerdown", (e) => {
  for (let i = 0; i < 30; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const circle = new PIXI.Graphics()
      .circle(0, 0, Math.random() * 8 + 3)
      .fill(color);

    circle.position.set(e.clientX, e.clientY);
    app.stage.addChild(circle);

    // Ger varje partikel en slumpmässig rörelse
    particles.push({
      circle,
      speedX: (Math.random() - 0.5) * 10,
      speedY: (Math.random() - 0.5) * 10
    });
  }
});

// Flyttar partiklarna
app.ticker.add((ticker) => {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.circle.x += p.speedX * ticker.deltaTime;
    p.circle.y += p.speedY * ticker.deltaTime;
    p.circle.alpha -= 0.02 * ticker.deltaTime;

    // Tar bort partiklar när de blir osynliga
    if (p.circle.alpha <= 0) {
      p.circle.destroy();
      particles.splice(i, 1);
    }
  }
});