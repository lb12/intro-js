'use strict';

import { valuesDictionary, plays, lowestToHighest } from './utils';

class Hand {
    constructor(cards) {
        this.cards = cards;
        this.bestPlay = 0;
        this.fixAceValueIfNeeded();
    }


    // Checking rules 

    checkStraightFlush() {
        return this.checkStraight() && this.checkFlush();
    }

    checkStraight() {
        let initialValue = this.cards[0].value;
        let isStraight = true;
    
        this.cards.slice(1).forEach(card => {
            if( parseInt(card.value) !== ( parseInt(initialValue) + 1 ) ) {
                isStraight = false;
            }
            initialValue = card.value;
        });
        return isStraight;
    }

    checkFlush() {
        let suit = this.cards[0].suit; // First card color of the hand
        let isFlush = true;
    
        this.cards.forEach(card => {
            if ( card.suit !== suit ) 
                isFlush = false;
        });
        return isFlush;
    }

    checkPoker() {
        let pokerRegularExpression = /([0-9]{1,2})\1{3}/;
        let cardsValue = this.cards.map(card => parseInt(card.value)).join('');    
    
        return pokerRegularExpression.test( parseInt(cardsValue) );
    }

    checkFull() {
        let isFull = false;
        let handWithoutThree = this.getUnrepeatedCards(3);
        if(handWithoutThree !== null) // If there is a three of a kind, check if there is a pair too
            isFull = this.checkPair( handWithoutThree );
    
        return isFull;
    }

    checkThreeOfAKind() {
        return this.isRepeatedInANumber(3);
    }
    
    checkDoublePair() {
        let isDoublePair = false;
        let unrepeatedCards = this.getUnrepeatedCards(2);
        if(unrepeatedCards !== null) // If at least a pair, we check if there is another one
            isDoublePair = this.checkPair( unrepeatedCards );
        return isDoublePair;
    }

    checkPair() {
        return this.isRepeatedInANumber(2);
    }
    
    checkPair( hand ) {
        return this.isRepeatedInANumber( 2, hand);
    }
    
    getHigherCardValue( hand ) {
        hand = hand || this.cards;
        let cardValue = hand[ hand.length - 1 ].value;
        return cardValue;
    }

    getPrettyHigherCard() {
        return valuesDictionary.toCard[this.getHigherCardValue()];
    }


    // Aux methods
    
    getUnrepeatedCards( repeatedAmount, hand ) {
        let otherCards = null;
        hand = hand || this.cards;

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

    isRepeatedInANumber( repeatedAmount, hand ) {
        let isRepeated = false;
        hand = hand || this.cards;

        isRepeated = this.getRepeatedCardValueInANumber(repeatedAmount, hand) !== -1;
        
        return isRepeated;
    }

    getRepeatedCardValueInANumber( repeatedAmount, hand ) {
        hand = hand || this.cards;
        let cardValue = -1;

        for(let i = 0; i < hand.length; i++) {
            let currentCard = hand[i];
            let possibleRepeated = hand.filter( card => card.value === currentCard.value );

            if( possibleRepeated.length >= repeatedAmount ) {
                cardValue = possibleRepeated[0].value;
                break;
            }
        }
        
        return cardValue;
    }

    // If hand has a straight and is the lowest straight possible (A 2 3 4 5), modify the A value from 14 to 1
    fixAceValueIfNeeded() {
        if( this.cards[0].value === '2' && this.cards[4].value === '14' ) {
            this.cards[4].value = '1';
            this.cards.sort(lowestToHighest);
        }
    }

    // Possible plays and get best play methods

    printPlays() {
        this.possiblePlays();
        this.bestPossiblePlay();
    }
    
    possiblePlays() {
        console.log('--> Possible plays...\n');

        console.log( 'Hand with \'' + this.getPrettyHigherCard() + '\' as higher card' );
        if( this.checkPair() ) {            console.log( 'Hand with Pair' );            this.bestPlay = 1; }
        if( this.checkDoublePair() ) {      console.log( 'Hand with Double Pair' );     this.bestPlay = 2; }
        if( this.checkThreeOfAKind() ) {    console.log( 'Hand with Three of a Kind' ); this.bestPlay = 3; }
        if( this.checkStraight() ) {        console.log( 'Hand with Straight' );        this.bestPlay = 4; }
        if( this.checkFlush() ) {           console.log( 'Hand with Flush' );           this.bestPlay = 5; }
        if( this.checkFull() ) {            console.log( 'Hand with Full' );            this.bestPlay = 6; }
        if( this.checkPoker() ) {           console.log( 'Hand with Poker' );           this.bestPlay = 7; }
        if( this.checkStraightFlush() ) {   console.log( 'Hand with Straigth Flush' );  this.bestPlay = 8; }
    }

    bestPossiblePlay() {
        console.log('\n--> Best play possible: ' + this.getPrettyBestPlay());
    }

    getPrettyBestPlay() {
        return plays[this.bestPlay];
    }
    
    printHand() {
        this.cards.forEach( card => {
            console.log(card.toString());
        });
        console.log('\n');
    }
}

export {
    Hand
}