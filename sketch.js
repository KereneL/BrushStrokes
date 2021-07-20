var grid = [];
var cellSize = 32;
var noiseRes = cellSize / 500;
var palleteSwitch;
var palletes = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  seedGrid();
  initPalletes();
  drawGrid();
}

function draw() {}

function mouseClicked() {
  palleteSwitch = Math.floor(random() * palletes.length);
  drawGrid();
}

function seedGrid() {
  for (let x = -1; x < (width / cellSize) + 1; x++) {
    let column = [];
    for (let y = -1; y < (height / cellSize) + 1; y++) {
      let currentAngle = getAngleFromCoordinates(x, y);
      column.push(currentAngle);
    }
    grid.push(column);
  }
}

function initPalletes() {

  var alpha = 0.80;
  palletes.push([`rgba(255, 23, 0,${alpha})`, `rgba(255, 166, 0,${alpha})`, `rgba(77, 105, 16,${alpha})`]); //Reggae
  palletes.push([`rgba(255, 255, 255,${alpha})`, `rgba(85, 205, 252,${alpha})`, `rgba(247, 168, 184,${alpha})`]); //Trans
  palletes.push([`rgba(1, 133, 88,${alpha})`, `rgba(189, 233, 2,${alpha})`, `rgba(254, 240, 49,${alpha})`]); //Lemon
  palletes.push([`rgba(255, 255, 255,${alpha})`, `rgba(125, 125, 125,${alpha})`, `rgba(0, 0, 0,${alpha})`]); //Grayscale

  palletes.push([`rgba(74, 83, 107,${alpha})`, `rgba(255, 154, 141,${alpha})`, `rgba(174, 214, 220,${alpha})`]); //Set
  palletes.push([`rgba(203, 246, 219,${alpha})`, `rgba(155, 196, 114,${alpha})`, `rgba(245, 190, 180,${alpha})`]); //Apple Strawberry
  palletes.push([`rgba(27, 101, 53,${alpha})`, `rgba(168, 198, 108,${alpha})`, `rgba(225, 221, 114,${alpha})`]); //Slime
  palletes.push([`rgba(185, 146, 94,${alpha})`, `rgba(237, 230, 185,${alpha})`, `rgba(130, 144, 121,${alpha})`]); //Giraffee
  palletes.push([`rgba(224, 169, 109,${alpha})`, `rgba(32, 30, 32,${alpha})`, `rgba(221, 195, 165,${alpha})`]); //Savannah
  palletes.push([`rgba(198, 215, 235,${alpha})`, `rgba(24, 104, 174,${alpha})`, `rgba(217, 165, 179,${alpha})`]); //Port
  palletes.push([`rgba(0, 0, 0,${alpha})`, `rgba(30, 132, 127,${alpha})`, `rgba(236, 193, 156,${alpha})`]); //Patina
  palletes.push([`rgba(107, 123, 140,${alpha})`, `rgba(59, 77, 97,${alpha})`, `rgba(239, 157, 16,${alpha})`]); //Sunset
  //palletes.push([`#ff0000`, '#00ff00', `#0000ff`]); TEST PALLETE

  palleteSwitch = Math.floor(random() * palletes.length);
  strokeWeight(cellSize/16);
}

function getNoise(x, y, z) {
  return noise(x * noiseRes, y * noiseRes, z);
}

function getAngleFromNoise(noiseValue) {
  return map(noiseValue, 0, 1, 0, TWO_PI);
}

function getAngleFromCoordinates(x, y, z = 0) {
  return getAngleFromNoise(getNoise(x, y, z));
}

function randomColor() {
  let r = random();
  let c;
  if (r > 0.8) {
    c = color(palletes[palleteSwitch][0]);
  } else if (r > 0.6) {
    c = color(palletes[palleteSwitch][1]);
  } else {
    c = color(palletes[palleteSwitch][2]);
  }

  fill(c);
  stroke(c);
}

function drawGrid() {
  let drawScaleX = 1.75;
  let drawScaleY = 1.75;

  for (let gridX = 0; gridX < grid.length; gridX++) {
    for (let gridY = 0; gridY < grid[gridX].length; gridY++) {
      let x = gridX * cellSize;
      let y = gridY * cellSize;
      randomColor();

      push();
      translate(x, y);
      rotate(grid[gridX][gridY]);

      let sizeX = cellSize * drawScaleX;
      let sizeY = cellSize * drawScaleY;
      for (strokes = 0; strokes < 128; strokes++) {
        let strokeX = (random() * (sizeX * 0.45)) + (sizeX * 0.5);
        let strokeY = (random() * sizeY) - (sizeY / 2);

        //1% Wiggle
        strokeX += ((strokeX * random()) - (strokeX / 2)) * 0.1;
        strokeY += ((strokeY * random()) - (strokeY / 2)) * 0.1;
        //Draw
        line(-strokeX, strokeY, strokeX, strokeY);
      }
      pop();

    }
  }
}