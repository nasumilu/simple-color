
export default class Color {

    // public static members
    static RED = new Color({ red: 255 });
    static GREEN = new Color( { green: 255 });
    static BLUE = new Color( { blue: 255 });
    // ... add more default colors here
    static SALMON = new Color( { red: 250, green: 128, blue: 114} );    


    // private members
    #_red;
    #_green;
    #_blue;

    constructor(value) {
        // a string normalize to
        if('string' === typeof value) {
            if(/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value)) {
                value = Color.#parseHexColor(value);
            } else if(/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.test(value)) {
                value = Color.#parseRgbColor(value);
            } else {
                throw `Unable to construct color from string ${value}!`;
            }
        }

        let options = Object.assign({
            red: 0,
            gree: 0,
            blue: 0
        }, value);

        this.red = options.red;
        this.green = options.green;
        this.blue = options.blue;
       

    }

    static #parseRgbColor(value) {
        // rgb(#,#,#);
        let rgb = [...value.matchAll(/(\d{1,3})/g)];
        return {
            red: rgb[0][0],
            green: rgb[1][0],
            blue: rgb[2][0]
        };
    }

    static #parseHexColor(value) {
        // css shorthand notation #f00 = #ff0000 = red
        let r,g,b;
        if(value.length === 4) {
            r = value.substring(1,2).repeat(2);
            g = value.substring(2,3).repeat(2);
            b = value.substring(3,4).repeat(2);
        } else {
            // regular hex color notation
            r = value.substring(1,3);
            g = value.substring(3,5);
            b = value.substring(5,7);
        }

        return {
            red: parseInt(r,16),
            green: parseInt(g, 16),
            blue: parseInt(b, 16)
        };
    }

    #fireColorChangeEvent() {
        // only works with DOM for nodejs need to import events module to use EventEmitter.emit
        if(document) {
            document.dispatchEvent(new CustomEvent('color:changed', { detail: this }));
        }
    }
    
    // private method
    #setValue(property, value) {
        if(value < 0 || value > 255) {
            throw `Value for ${property} must be between 0 and 255, found ${value}!`;
        }
        this[`#_${property}`] = value;
        this.#fireColorChangeEvent();
    }

    #getValue(property) {
        return parseInt(this[`#_${property}`]);
    }

    set red(value) {
        this.#setValue('red', value);
    }

    get red() {
        return this.#getValue('red');
    }

    set green(value) {
        this.#setValue('green', value);
    }

    get green() {
        return this.#getValue('green');
    }

    set blue(value) {
        this.#setValue('blue', value);
    }

    get  blue() {
        return this.#getValue('blue');
    }

    get hex() {
        let r = "0" + this.red.toString(16);
        let g = "0" + this.green.toString(16);
        let b = "0" + this.blue.toString(16);

        return `#${r.substring(r.length - 2)}${g.substring(g.length - 2)}${b.substring(b.length - 2)}`;
    }

    set hex(value) {
        for(const [key, v] of Object.entries(Color.#parseHexColor(value))) {
            this[key] = v;
        }
    }

    get rgb() {
        return `rgb(${this.red},${this.green},${this.blue})`;
    }
}