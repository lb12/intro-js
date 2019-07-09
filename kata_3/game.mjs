'use strict'

import { Card } from "./card";
import { lowestToHighest, valuesDictionary,  } from "./utils";


let hand1 = []; 
let hand2 = [];

let error = new Error();

function playGame(hand1String, hand2String) { // hand1String='1H,1C,1D,1S,4H' ; hand2String='6C,9D,7H,3S,9H'
    init(hand1String, hand2String);

    // If there is an error with hand initiation, exit
    if(error.message !== "")
        return;

    console.log('\nPlayer 1 Hand checker...\n');
    printHand(hand1);
    checkHandRules(hand1);
    console.log('\nPlayer 2 Hand checker...\n');
    printHand(hand2);
    checkHandRules(hand2);
}

function init(hand1String, hand2String) {
    handInitiator(hand1String, hand1);
    handInitiator(hand2String, hand2);
}

function handInitiator(handString, handReturned) {
    try {
        isGoodHand(handString);
    } catch(ex) {
        console.log(error);
        return;
    }

    handString.split(',').forEach( element => {
        let value = valuesDictionary.toValues[element[0]];
        let suit = element[1];
        handReturned.push( new Card(value, suit) );
    });
    handReturned = handReturned.sort(lowestToHighest);
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

function printHand( hand ) {
    hand.forEach( card => {
        console.log(card.toString());
    });
    console.log('\n');
}

function checkHandRules( hand ) {
    console.log(`checkStraightFlush? ${checkStraightFlush(hand)}`);
    console.log(`checkPoker? ${checkPoker(hand)}`);
    console.log(`checkFull? ${checkFull(hand)}`);
    console.log(`checkFlush? ${checkFlush(hand)}`);
    console.log(`checkStraight? ${checkStraight(hand)}`);
    console.log(`checkThreeOfAKind? ${checkThreeOfAKind(hand)}`);
    console.log(`checkDoublePair? ${checkDoublePair(hand)}`);
    console.log(`checkPair? ${checkPair(hand)}`);
    console.log(`getHigherCardValue = ${getHigherCardValue(hand)}`);
}

function checkStraightFlush( hand ) {
    let isStraightFlush = checkStraight(hand) && checkFlush(hand);
    return isStraightFlush;
}

function checkStraight( hand ) {
    let initialValue = hand[0].value;
    let isStraight = true;

    hand.slice(1).forEach(card => {
        if( parseInt(card.value) !== ( parseInt(initialValue) + 1 ) ) {
            isStraight = false;
        }
        initialValue = card.value;
    });
    return isStraight;
}

function checkFlush( hand ) {
    let suit = hand[0].suit; // First card color of the hand
    let isFlush = true;

    hand.forEach(card => {
        if ( card.suit !== suit ) 
            isFlush = false;
    });
    return isFlush;
}

function checkPoker( hand ) {
    let pokerRegularExpression = /([0-9]{1,2})\1{3}/;
    let cardsValue = hand.map(card => parseInt(card.value)).join('');    

    return pokerRegularExpression.test( parseInt(cardsValue) );
}

function checkFull( hand ) {
    let isFull = false;
    let handWithoutThree = getUnrepeatedCards( hand, 3 );
    if(handWithoutThree !== null) // If there is a three of a kind, check if there is a pair too
        isFull = checkPair( handWithoutThree );

    return isFull;
}

function checkThreeOfAKind( hand ) {
    return isRepeatedInANumber( hand, 3);
}

function checkDoublePair( hand ) {
    let isDoublePair = false;
    let unrepeatedCards = getUnrepeatedCards(hand, 2);
    if(unrepeatedCards !== null) // If at least a pair, we check if there is another one
        isDoublePair = checkPair( unrepeatedCards );
    return isDoublePair;
}

function checkPair( hand ) {
    return isRepeatedInANumber( hand, 2);
}

function getHigherCardValue( hand ) {
    let cardValue = hand[4].value;
    return cardValue;
}



// Aux methods


function getUnrepeatedCards( hand, repeatedAmount ) {
    let otherCards = null;
    for(let i = 0; i < hand.length; i++) {
        let currentCard = hand[i];
        let repeatedCards = hand.filter( card => card.value === currentCard.value );
        if( repeatedCards.length >= repeatedAmount ) {

            otherCards = hand.slice(); 
            otherCards.splice(i, repeatedAmount);
            break;
        }
    }
    return otherCards;
}

function isRepeatedInANumber( hand, repeatedAmount ) {
    let isRepeated = false;

    hand.forEach( currentCard => {
        let possibleRepeated = hand.filter( card => card.value === currentCard.value );
        if( possibleRepeated.length >= repeatedAmount ) {
            isRepeated = true;
        }
    });
    return isRepeated;
}


export {
    playGame as PlayGame
}