//****** State ***********/

let currentIndex = 0;
const durationMs = 4000;
let elapsedMs = 0;
let paused = false;
let lastTick;
const slideCount = 3;

const track = document.querySelector(".slider__track");
const viewport = document.querySelector(".slider__viewport");
const fills = document.querySelectorAll(".progress__fill");

function renderProgress() {
  const p = Math.max(0, Math.min(1, elapsedMs / durationMs));
  fills.forEach((el, i) => {
    el.style.width = i === currentIndex ? p * 100 + "%" : "0%";
  });
}

function tick(now) {
  if (lastTick == null) {
    lastTick = now;
  }
  const dt = now - lastTick;
  lastTick = now;

  if (!paused) {
    elapsedMs += dt;
  }

  if (elapsedMs >= durationMs) {
    goToSlide(currentIndex + 1);
  }

  renderProgress();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

function goToSlide(index) {
  currentIndex = ((index % slideCount) + slideCount) % slideCount;
  elapsedMs = 0;
  renderProgress();
  //   console.log(currentIndex, elapsedMs);
  renderSlidePosition();
}

function pageWidth() {
  return viewport.clientWidth;
}

function renderSlidePosition() {
  const x = -currentIndex * pageWidth();
  track.style.transform = `translateX(${x}px)`;
}

window.addEventListener("resize", renderSlidePosition);
