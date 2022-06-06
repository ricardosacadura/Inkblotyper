//---------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------Rorschach's function drawns----------------------------------------------------------------//
//------------------------------------Inspired from https://openprocessing.org/sketch/410033 by setupdraw [march 1st, 2017]--------------------//


class Rorschach {

    constructor(rMin, rMax, oscMin, oscMax, hue) {

        this.transX = width_canvas / 2;
        this.transY = height_canvas / 2;
        this.xoff = map(int(random(1, 5)), 1, 5, 1000, 5000);
        this.yoff = 0;
        this.rMin = rMin;
        this.rMax = rMax;
        this.oscMin = oscMin;
        this.oscMax = oscMax;
        this.hue = hue;
    }

    drawRorschach() {

        push();
        fill(this.hue);
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