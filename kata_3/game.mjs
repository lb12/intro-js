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

    console.log('\n------------------------------\n');
    console.log('--> Player 1 Hand...\n');
    hand1.printHand();
    hand1.printPlays();
    console.log('\n------------------------------\n');
    console.log('--> Player 2 Hand...\n');
    hand2.printHand();
    hand2.printPlays();
    console.log('\n------------------------------\n');
    compareHands();
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

function compareHands() {
    if(hand1.bestPlay > hand2.bestPlay)
        console.log('Player 1 wins, ' + hand1.getPrettyBestPlay());
    else if (hand1.bestPlay < hand2.bestPlay)
        console.log('Player 2 wins, ' + hand2.getPrettyBestPlay());
    else {
        switch(hand1.bestPlay) { //Hand 1 and Hand 2 bestplay are equal, so it does not matter
            case 1: // Pair
                resolvePairTie();
                break;
            case 2: // Double Pair
                console.log('double pair');
                
                break;
            case 3: // Three of a Kind
            case 6: // Full
                resolveThreeOfAKind();
                break;
            default: // Higher card and sucesive
                console.log( resolveHigherCardBetweenPlayers() );
        }
    }
}

function resolvePairTie() {
    let hand1Value = hand1.getRepeatedCardValueInANumber(2);
    let hand2Value = hand2.getRepeatedCardValueInANumber(2);

    if (hand1Value > hand2Value)
        console.log('Player 1 wins, ' + hand2.getPrettyBestPlay() + ', ' + hand1Value + ' is greater than ' + hand2Value);
    else if (hand1Value < hand2Value)
        console.log('Player 2 wins, ' + hand2.getPrettyBestPlay() + ', ' + hand2Value + ' is greater than ' + hand1Value);
    else {
        console.log( resolveHigherCardBetweenPlayers() );
    }
}

function resolveHigherCardBetweenPlayers(){
    let h1 = hand1.cards.slice();
    let h2 = hand2.cards.slice();
    let exit = false;
    let output = "";

    do {
        if (hand1.getHigherCardValue(h1) === hand2.getHigherCardValue(h2)) {
            if(h1.length === 1){ // Exit condition
                output = 'Tie, players have the same cards value.';
                exit = true; // break;
            }
            h1.splice(h1.length - 1);
            h2.splice(h2.length - 1);
        } else {
            let playerWinner = hand1.getHigherCardValue(h1) > hand2.getHigherCardValue(h2) ? 1 : 2;
             output = 'Player ' + playerWinner + ' wins, ' + hand1.getPrettyBestPlay() + ', Higher card'; // getPrettyBestPlay = in both players (it was a tie!)
            exit = true; // break;
        }
    } while(!exit);

    return output;
}

function resolveThreeOfAKind(){
    let hand1Value = hand1.getRepeatedCardValueInANumber(3);
    let hand2Value = hand2.getRepeatedCardValueInANumber(3);
    if (hand1Value > hand2Value)
        console.log('Player 1 wins, ' + hand2.getPrettyBestPlay() + ', ' + hand1Value + ' is greater than ' + hand2Value);
    else (hand1Value < hand2Value)
        console.log('Player 2 wins, ' + hand2.getPrettyBestPlay() + ', ' + hand2Value + ' is greater than ' + hand1Value);
}

export {
    playGame as PlayGame
}