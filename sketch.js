let fft
let sound;
let freq;
let lines = 10;
let range = 600;
let width = 400;
let innerWidth = 200;
let gap = 30;
function preload(){
 sound = loadSound('free1.mp3');
}

function setup(){
  getAudioContext().suspend();
  createCanvas(800,800);
  fft = new p5.FFT();
  sound.play();
}

function draw(){
/* 
  textAlign(LEFT);
  text("(" + floor(mouseX) + ", " + floor(mouseY) + ")", mouseX, mouseY); */


  background('black');
  textSize(16);
  strokeWeight(5);
  stroke('white');
  fill('black');
  

  freq = fft.analyze();
  
  
  let segment = Math.floor(200/lines);
  let segmentLength = innerWidth/segment
  translate(0,200);


  for(let i = 0; i < lines; i++){
    let y = gap * i;

    beginShape();
    curveVertex(800/2 - innerWidth,y);
    curveVertex(800/2 - innerWidth,y);
    curveVertex(800/2 - 100,y);

    for(let j = 0; j < segment; j++){

      let freq1 = freq[i * segment + j];
      let amplitude = map(freq1,0,256,0,10);
      amplitude = Math.pow(amplitude,2);

      curveVertex(800/2 - 100 + j * segmentLength,y - amplitude);
      
    }
    
    curveVertex(800/2 + innerWidth - 100,y);
    curveVertex(800/2 + innerWidth ,y);
    curveVertex(800/2 + innerWidth ,y);
    endShape();

  }
}

function mousePressed() {
  userStartAudio();
}