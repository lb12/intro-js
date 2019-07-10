'use strict';

class Hand {
    constructor(cards) {
        this.cards = cards;
    }

    printHand() {
        this.cards.forEach( card => {
            console.log(card.toString());
        });
        console.log('\n');
    }

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
    
    getHigherCardValue() {
        let cardValue = this.cards[4].value;
        return cardValue;
    }


    // Aux methods
    
    getUnrepeatedCards( repeatedAmount ) {
        let otherCards = null;
        for(let i = 0; i < this.cards.length; i++) {
            let currentCard = this.cards[i];
            let repeatedCards = this.cards.filter( card => card.value === currentCard.value );
            if( repeatedCards.length >= repeatedAmount ) {

                otherCards = this.cards.slice(); 
                otherCards.splice(i, repeatedAmount);
                break;
            }
        }
        return otherCards;
    }

    isRepeatedInANumber( repeatedAmount, hand ) {
        let isRepeated = false;
        hand = hand || this.cards;

        hand.forEach( currentCard => {
            let possibleRepeated = hand.filter( card => card.value === currentCard.value );
            if( possibleRepeated.length >= repeatedAmount ) {
                isRepeated = true;
            }
        });
        return isRepeated;
    }
}

export {
    Hand
}