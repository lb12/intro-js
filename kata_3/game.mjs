'use strict'

import { Card } from "./card";
import { Hand } from "./hand";
import { lowestToHighest, valuesDictionary,  } from "./utils";


let hand1;
let hand2;

let error = new Error();

function playGame(hand1String, hand2String) { // hand1String='1H,1C,1D,1S,4H' ; hand2String='6C,9D,7H,3S,9H'
    init(hand1String, hand2String);

    // If there is an error with hand initiation, exit
    if(error.message !== "")
        return;

    console.log('--> Player 1 Hand...\n');
    hand1.printHand();
    hand1.possiblePlays();
    console.log('\n------------------------------\n');
    console.log('--> Player 2 Hand...\n');
    hand2.printHand();
    hand2.possiblePlays();
}

function init(hand1String, hand2String) {
    hand1 = new Hand(handInitiator(hand1String));
    hand2 = new Hand(handInitiator(hand2String));
}

function handInitiator(handString) {
    try {
        isGoodHand(handString);
    } catch(ex) {
        console.log(error);
        return;
    }

    let cards = [];

    handString.split(',').forEach( element => {
        let value = valuesDictionary.toValues[element[0]];
        let suit = element[1];
        cards.push( new Card(value, suit) );
    });
    return cards.sort(lowestToHighest);
}

function isGoodHand( handString ) {
    // Check if there are repeated cards
    let normalizedHand = handString.split(',').filter( (item, index, array) => {
        return array.indexOf(item) === index;
    });

    if( normalizedHand.length != 5 ) {
        error.message = 'There should only be 5 different cards.';
        throw error;
    }
}

export {
    playGame as PlayGame
}