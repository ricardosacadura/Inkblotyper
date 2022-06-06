//---------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------Rorschach's function drawns----------------------------------------------------------------//
//------------------------------------Inspired from https://openprocessing.org/sketch/410033 by setupdraw [march 1st, 2017]--------------------//


class Rorschach {

    constructor(hue) {

        this.transX = width_canvas / 2;
        this.transY = height_canvas / 2;
        this.xoff = map(int(random(1, 5)), 1, 5, 1000, 5000);
        this.yoff = 0;
        this.hue = hue;

        this.genes = [4];
        this.fitness = 0;

        this.points = [];
        this.osc2 =1;

    }

    Rorschach() {
        randomize();
    }

    Rorschach(genes_init) {
        for (let i = 0; i < genes_init.length; i++) {
            genes[i] = genes_init[i];
        }
    }

    randomize() {
        for (let i = 0; i < genes.length; i++) {
            genes[i] = random(-1, 1);
        }
    }

    onePointCrossover(partner) {

        let child = new Rorschach();
        let crossover_point = int(random(-1, genes.length - 1));
        for (let i = 0; i < genes.length; i++) {
            if (i < crossover_point) {
                child.genes[i] = genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }

    mutate() {
        for (let i = 0; i < genes.length; i++) {
            if (random(1) <= mutation_rate) {
                //genes[i] = random(1); // Replace gene with a random one
                genes[i] = constrain(genes[i] + random(-0.1, 0.1), -1, 1); // Adjust the value of the gene
            }
        }
    }

    // Set the fitness value
    setFitness(fitness) {
        this.fitness = fitness;
    }

    // Get the fitness value
    getFitness() {
        return fitness;
    }

    // Get a clean copy
    getCopy() {
        copy = new Harmonograph(genes);
        copy.fitness = fitness;
        return copy;
    }

    getPhenotype(resolution) {
        canvas = createGraphics(resolution, resolution);
        canvas.beginDraw();
        canvas.background('#0e0e0e');
        //(não usar isto para já) canvas.noFill();
        //(não usar isto para já) canvas.stroke(255);
        //(não usar isto para já) canvas.strokeWeight(canvas.height * 0.002);
        render(canvas, canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
        canvas.endDraw();
        return canvas;
    }

    render(canvas) {

        canvas.push();
        fill(this.hue);
        canvas.translate(this.transX, this.transY + this.osc2);

        canvas.beginShape();
        for (let i = 0; i < this.points.length; i++) {
            canvas.vertex(this.points.get(i).x, this.points.get(i).y);
        }
        canvas.endShape();
        canvas.pop();

    }

    calculatePoints() {

        let oscMin = 100 * gene[0];
        let oscMax = 100 * gene[1];
        let rMin = 100 * gene[2];
        let rMax = 100 * gene[3];

        this.osc2 = map(sin(this.yoff), -1, 1, oscMin, oscMax);
        this.points.splice(this.points.length);

        for (let a = -PI / 2; a <= (3 * PI) / 2; a += da) {
            let n = noise(this.xoff, this.yoff); // -> geting me values from 0 and 1;
            let r = map(n, 0, 1, rMin, rMax + osc2);
            if (a <= PI / 2) { // -> left wing
                this.xoff += dx; // -> scrubbing through perlinNoise "timeline"
            } else { // -> right wind
                this.xoff -= dx; // -> reverse scrubbing through perlinNoise "timeline"
            }
            let point_x = r * cos(a);
            let point_y = r * sin(a);
            let point = createVector(point_x,point_y);
            this.points.push(point);
        }

        this.yoff += 0.03;

    }

}