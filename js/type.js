class Type {

    constructor(letter, xpos, ypos, size, sf) {

        this.letter = letter;
        this.xpos = xpos;
        this.ypos = ypos;
        this.size = size;
        this.sf = sf;
    }

    setposX(letras_w) { // -> Function that sets the X position of the input word (textWidth)
        this.xpos = this.xpos - letras_w / 2;

        return this.xpos;
    }

    setposY(font) { // -> Function that sets the Y position of the input word (textBounds.h)

        let box_letras = font.textBounds(this.letter, 0, 0, this.size);
        let h = box_letras.h;
        this.ypos = (this.ypos) + (h / 2);

        //print("larguraY - " + h + " palavra " + this.letter + " fontSize " + this.size);


        return this.ypos;
    }

    generate(fontArray, mouse, original, distortion, dist, raio) {


        //print("y: " + this.ypos + " x: " + this.xpos + " size: " + this.size);

        fontArray = font.textToPoints(this.letter, this.xpos, this.ypos, this.size, // -> Mapping font to points
            this.sf);

        let cor = color(random(255), random(255), random(255));
        stroke(255, 0, 0); //color(random(255),random(255),random(255));

        beginShape();
        for (let i = 0; i < fontArray.length; i++) {

            original = createVector(fontArray[i].x, fontArray[i].y); // -> Vector that stores information on each point of the letter

            distortion = p5.Vector.sub(original, mouse); // -> Vectors subtraction to get distance

            dist = distortion.mag();

            if (dist < raio) {
                let t = map(dist, 0, raio, 50, 0);
                distortion.setMag(t);
                original.add(distortion); // -> Add distortion for each original vector (inflated by previous mapping)
            }

            if (i > 0) beginContour();
            vertex(original.x, original.y); // -> Final vertex renderization
            if (i > 0) endContour(CLOSE);


        }
        endShape(CLOSE);

    }


}