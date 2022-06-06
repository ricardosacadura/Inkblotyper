let font;
let fontArray;

const raio = 200;

let original;
let mouse;
let distortion;
let dist;


let x_letter = 0;
let y_letter = 0;

let still_t = true; // -> toggle still image on/off

const width_canvas = 1000;
const height_canvas = 550;


//--------------------------------------Rorschach declarations

let da; // -> Delta angle
let dx; // -> Noise increment value

let still = false; // -> Toggle still image on/off
let rorschach = [7];


//--------------------------------------Text rendering declarations

let fontSize; // -> font size when rendered
let texto;
let num_letras;
let tamX_letras;
let textO;
let type;

let getGraphics;


function preload() {

    font = loadFont('styles/fonts/HelveticaNeue-01.ttf'); // -> font preload
}

function setup() { //----------------------------------------------------------SETUP---------------------------------------------------------------//

    const type_g = createCanvas(width_canvas, height_canvas);
    type_g.parent('#output-section');
    getGraphics = createGraphics(width_canvas, height_canvas);

    frameRate(8);

    textFont(font);
    textSize(fontSize);

    texto = $("#input-text").val(); // -> receiving input value from html
    textO = texto.toUpperCase();

    num_letras = texto.length;
    tamX_letras = textWidth(textO);

    rorschach[0] = new Rorschach(220); // -> initializing rorschach's
    rorschach[1] = new Rorschach(220);
    rorschach[2] = new Rorschach('#0e0e0e');
    rorschach[3] = new Rorschach('#0e0e0e');
    rorschach[4] = new Rorschach(220);
    rorschach[5] = new Rorschach('#0e0e0e');
    rorschach[6] = new Rorschach(220);
    rorschach[7] = new Rorschach(220);

    fontSize = 650 - num_letras * 80;

    type = new Type(textO, width / 2, height / 2, fontSize, // -> Mapping font to points & calling Type class
        { sampleFactor: 0.5 });

    type.setposX(tamX_letras);
    type.setposY(font);
    //print("texto - " + textO + " " + "tamX - " + tamX_letras);

    mouse = createVector(0, 0); // -> Vector for mouse x & y positions in the future

    da = PI / 100 // -> Delta angle
    dx = 0.05; // -> Noise increment value

}

function draw() { //---------------------------------------------------------DRAW------------------------------------------------------------------//

    //print(frameRate()); f***ing disaster    
    stroke(255)
    strokeWeight(3); // TO DO -> Adjusting strokeWeight() to the number of letters ----------> VARIABLE;

    mouse.x = x_letter;
    mouse.y = y_letter;

    if (!still) {
        background('#0e0e0e');
        noStroke();
        for (i in rorschach) {
            rorschach[i].render(getGraphics);
            rorschach[i].render(getGraphics);
            rorschach[i].render(getGraphics);
        }

    }

    type.generate(fontArray, mouse, original, distortion, dist, raio); // -> Generate function from Type class


}

function mouseDragged() {
    x_letter = mouseX;
    y_letter = mouseY;
}

function keyPressed() {

    still = !still;
    still_t = !still_t;
}




