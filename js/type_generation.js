let font;
let fontSize; // -> font size when rendered
let fontArray;

const raio = 200;

let original;
let mouse;
let distortion;
let dist;

let type;
let type2;

let x_letter = 0;
let y_letter = 0;

let still_t = true; // -> toggle still image on/off

let width_canvas = 1000;
let height_canvas = 550;


//--------------------------------------Inkblots declarations

let da; // -> Delta angle
let dx; // -> Noise increment value

let still = false; // -> Toggle still image on/off
let inkblots = [];


let texto;
let num_letras;
let tamX_letras;
let tamY_letras;
let textO;


function preload() {

    font = loadFont('styles/fonts/HelveticaNeue-01.ttf');
}

function setup() {

    const type_g = createCanvas(width_canvas, height_canvas);
    type_g.parent('#output-section');

    frameRate(8);

    textFont(font);
    textSize(fontSize);

    texto = $("#input-text").val();
    textO = texto.toUpperCase();

    num_letras = texto.length;
    tamX_letras = textWidth(textO);
    initInkBlots(); // -> Initializing my inkBlots

    fontSize = 650 - num_letras * 65;

    type = new Type(textO, width / 2, height/2, fontSize, // -> Mapping font to points & calling Type class
        { sampleFactor: 0.5 });

    type.setposX(tamX_letras);
    type.setposY(font);
    //print("texto - " + textO + " " + "tamX - " + tamX_letras);

    mouse = createVector(0, 0); // -> Vector for mouse x & y positions in the future

    da = PI / 100 // -> Delta angle
    dx = 0.05; // -> Noise increment value

}

function draw() {

    //print(frameRate());
    stroke(255)
    strokeWeight(3);

    mouse.x = x_letter;
    mouse.y = y_letter;

    if (!still) {
        background('#0e0e0e');
        noStroke();
        for (i in inkblots) {
            inkblots[i].drawInk();
        }

    }

    type.generate(fontArray, mouse, original, distortion, dist, raio); // -> Generate function from Type class
}

function windowResized() {
    resizeCanvas(width_canvas, height_canvas);
    initInkBlots();
    still = false;
}

function mouseDragged() {
    x_letter = mouseX;
    y_letter = mouseY;
}

function keyPressed() {

    still = !still;
    still_t = !still_t;
}

//---------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------Roschart's function drawns----------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------//


function initInkBlots() {
    inkblots[0] = new Inkblot(100, 300, -20, 20, 220); // initializing my inkBlots
    inkblots[1] = new Inkblot(-300, -50, 100, -100, 220);
    inkblots[2] = new Inkblot(50, 300, -200, 200, '#0e0e0e');
    inkblots[3] = new Inkblot(70, 140, 130, -130, '#0e0e0e');
    inkblots[4] = new Inkblot(-400, 0, 20, -20, 220);
    inkblots[5] = new Inkblot(50, 310, -10, 10, '#0e0e0e');
    inkblots[6] = new Inkblot(-400, -20, 100, -50, 220);
    inkblots[7] = new Inkblot(0, 100, 0, -100, 220);
}

function Inkblot(rMin, rMax, oscMin, oscMax, hue) {
    // instance data
    this.transX = width_canvas / 2;
    this.transY = height_canvas / 2;
    this.xoff = map(int(random(1, 5)), 1, 5, 1000, 5000);
    this.yoff = 0;
    this.rMin = rMin;
    this.rMax = rMax;
    this.oscMin = oscMin;
    this.oscMax = oscMax;
    this.hue = hue;

    this.drawInk = function () {

        push();
        fill(hue);
        let osc2 = map(sin(this.yoff), -1, 1, this.oscMin, this.oscMax);

        translate(this.transX, this.transY + osc2);

        beginShape();
        for (var a = -PI / 2; a <= (3 * PI) / 2; a += da) {
            let n = noise(this.xoff, this.yoff); // -> geting me values from 0 and 1;
            let r = map(n, 0, 1, this.rMin, this.rMax + osc2);
            if (a <= PI / 2) { // -> left wing
                this.xoff += dx; // -> scrubbing through perlinNoise "timeline"
            } else { // -> right wind
                this.xoff -= dx; // -> reverse scrubbing through perlinNoise "timeline"
            }
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x, y);
        }
        endShape();
        pop();
        this.yoff += 0.03;
    }

}