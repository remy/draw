/*globals document window */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const textarea = document.querySelector('textarea');

let drawing = false;
let hue = 0;
let [ width, height ] = [0,0];
let last = null;

// resize
const resize = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, width, height);
//   textarea.value = '';
};

const getCoords = e => {
  if (e.targetTouches) {
    e = e.targetTouches[0];
  }

  return {
    x: e.pageX,
    y: e.pageY,
  };
};

const draw = e => {
  if (drawing) {
    hue++;
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    const { x, y } = getCoords(e);
    if (last) {
      ctx.moveTo(last.x, last.y);
    }
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    last = { x, y };
  }
};

window.addEventListener('resize', resize);
resize();

document.addEventListener('keydown', (e) => {
  // if (e.which === 70 && e.metaKey && e.shiftKey) {
  //   e.preventDefault();
  //   document.body.requestFullscreen();
  //   return;
  // }
  textarea.focus();
});

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  canvas.focus();
  resize();
});

canvas.addEventListener('dblclick', resize);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  drawing = true;
});

canvas.addEventListener('touchend', e => {
  e.preventDefault();
  drawing = false;
  last = null;
});

canvas.addEventListener('mousedown', e => {
  e.preventDefault();
  drawing = true;
});

canvas.addEventListener('mouseup', e => {
  e.preventDefault();
  drawing = false;
});

