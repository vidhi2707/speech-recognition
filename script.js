const msgEL = document.getElementById('msg');
const randomNum = randomNumber();
console.log('Number : ', randomNum);
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.start();
function writeMes(msg) {
  msgEL.innerHTML = `<div>You said:</div><span class="box">${msg}</span>`;
}
function checkmsg(msg) {
  const num = +msg;
  if (Number.isNaN(num)) {
    msgEL.innerHTML += '<div>This is not a valid number.</div>';
    return;
  }
  if (num > 100 || num < 1) {
    msgEL.innerHTML += '<div>The number should be in the range 1-100.</div>';
  }
  if (num == randomNum) {
    document.body.innerHTML = `<h2>Congrats! You've guessed the number!</br></br> It was ${num}</h2>
      <button class="play-again" id = "play-again">PLAY AGAIN</button>`;
  } else if (num > randomNum) {
    msgEL.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEL.innerHTML += '<div>GO HIGHER</div>';
  }
}
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMes(msg);
  checkmsg(msg);
}
function randomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
recognition.addEventListener('result', onSpeak);
recognition.addEventListener('end', () => recognition.start());
document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
