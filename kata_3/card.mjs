'use strict';

import { suits } from './utils';

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    toString() {
        console.log( `${this.constructor.name} : { ${this.value} of ${suits[this.suit]} (${this.value}${this.suit}) }  `);
    }
}

export { Card }