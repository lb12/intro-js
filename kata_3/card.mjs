'use strict';

import { suits, valuesDictionary } from './utils';

class Card {
    constructor(value, suit) {
        this.value = value; // eg -> 8
        this.suit = suit; // eg -> H 
    }

    toString() {
        return `${ this.constructor.name } : { ${ valuesDictionary.toCard[this.value] } of ` +
        `${ suits[this.suit] } (${ valuesDictionary.toCard[this.value] }${ this.suit }) }  `;
    }
}

export { Card }