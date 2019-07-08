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

    checkColor(hand1);
    checkPoker(hand1);
}



function init() {
    // let cardSet1 = new Set([
    //     new Card( '1', 'H' ),
    //     new Card( '2', 'S' ),
    //     new Card( '3', 'H' ),
    //     new Card( '9', 'C' ),
    //     new Card( '2', 'D' )
    // ].sort(lowestToHighest));
    // let cardSet2 = new Set([
    //     new Card( '2', 'C' ),
    //     new Card( '3', 'H' ),
    //     new Card( '4', 'S' ),
    //     new Card( '8', 'C' ),
    //     new Card( 'A', 'H' )
    // ]);
    let cardSet1 = new Set([
        new Card( '6', 'H' ),
        new Card( '6', 'S' ),
        new Card( '6', 'H' ),
        new Card( '6', 'C' ),
        new Card( '5', 'D' )
    ].sort(lowestToHighest));


    hand1 = new Hand(cardSet1);
    // hand2 = new Hand(cardSet2);
}

function checkColor( hand ) {
    let color = hand.cardList.values().next().value.suit; // First card color of the hand
    let isColor = true;

    hand.cardList.forEach(card => {
        if ( card.suit !== color ) 
            isColor = false;
    });
    console.log('Color? ' + isColor);
    return isColor;
}


function checkPoker( hand ) {
    let baseCard = hand.cardList.values().next().value; // First card value of the hand
    let counter = 0;
    let changeCardValue = 0;
    let isPoker = true;

    let subArray = Array.from(hand.cardList).slice(1);

    for(let i = 0; i <= subArray.length; i++) {
        let currentCard = subArray[i];
        
        if( counter === 3 && i >= 2 ) {
            break; // poker = true (exit condition)
        } else if ( currentCard === undefined || (counter <= 2 && i > 2 && changeCardValue > 1)  ) { // Last check failed or impossible to reach a poker
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
    console.log('Poker? ' + isPoker);

    return isPoker;
}