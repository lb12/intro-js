'use strict'

import { Card } from "./card";
import { Hand } from "./hand";
import { lowestToHighest } from "./utils";


let hand1; 
let hand2;

playGame();



function playGame() {
    init();
    console.log('\nPlayer 1:');
    hand1.printHand();
    // console.log('\nPlayer 2:');
    // hand2.printHand();

    // Check

    hand1 = Array.from(hand1.cardList);

    console.log(`checkStraightFlush? ${checkStraightFlush(hand1)}`);
    console.log(`checkPoker? ${checkPoker(hand1)}`);
    console.log(`checkFull? ${checkFull(hand1)}`);
    console.log(`checkFlush? ${checkFlush(hand1)}`);
    console.log(`checkStraight? ${checkStraight(hand1)}`);
    console.log(`checkThreeOfAKind? ${checkThreeOfAKind(hand1)}`);
    console.log(`checkDoublePair? ${checkDoublePair(hand1)}`);
    console.log(`checkPair? ${checkPair(hand1)}`);
    console.log(`getHigherCardValue = ${getHigherCardValue(hand1)}`);
}



function init() {
    let cardSet1 = new Set([
        new Card( '1', 'H' ),
        new Card( '1', 'S' ),
        new Card( '1', 'D' ),
        new Card( '1', 'C' ),
        new Card( '2', 'H' )
    ].sort(lowestToHighest));

    hand1 = new Hand(cardSet1);
    // hand2 = new Hand(cardSet2);
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
    let baseCard = hand[0].value; // First card value of the hand
    let counter = 0;
    let changeCardValue = 0;
    let isPoker = true;

    let subArray = hand.slice(1);

    for(let i = 0; i <= subArray.length; i++) {
        let currentCard = subArray[i];
        
        if( counter === 3 && i >= 2 ) {
            break; // poker = true (exit condition)
        } else if ( currentCard === undefined || (counter <= 2 && i > 2 && changeCardValue > 1) ) { // Last check failed or impossible to reach a poker
            isPoker = false; // poker = false (exit condition)
            break;
        } else if ( baseCard.value === currentCard.value ) {
            counter++;
        } else { // Different values: update card values and make a card change, reset counter
            baseCard = currentCard;
            changeCardValue++;
            counter = 0;
        }
    }

    return isPoker;
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
