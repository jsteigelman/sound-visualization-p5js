let mySound, amplitude;
let songIsPlaying = false;

function preload() {
  soundFormats("mp3", "ogg");
  mySound = loadSound("assets/Sun Machine One - Loopop.mp3");
}

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.mouseClicked(togglePlay);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(220);
  drawCircle();
  displayText(songIsPlaying);
}

function drawCircle() {
  
  // get volume
  let level = amplitude.getLevel();
  let size = map(level, 0, 0.2, 0, width);
  
  // get frequency
  // let waveform = fft.waveform();
  // for (let i = 0; i < waveform.length; i++) {
  //   chosenColor = map( waveform[i], -1, 1, 1, 256);
  // }
  
  // draw circle
  let chosenColor = map(level, 0, 0.2, 1, 256)
  fill(chosenColor)
  ellipse(width / 2, height / 2, size, size);
}

function displayText(playingStatus) {
  const myText = "tap to play";
  const xTextCoord = width / 2 ;
  const yTextCoord = height / 2;
  if (!playingStatus) {
    fill('blue');
    textSize(24);
    textAlign(CENTER, CENTER);
    text(myText, xTextCoord, yTextCoord);
  }
}

function togglePlay() {
  if (mySound.isPlaying()) {
    mySound.pause();
    songIsPlaying = false;
  } else {
    mySound.loop();
    amplitude = new p5.Amplitude();
    amplitude.setInput(mySound);
    songIsPlaying = true;
  }
}
