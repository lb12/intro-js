'use strict';

class Hand {

    // Hand = Set of 5 cards
    constructor(cardList) {
        this.cardList = cardList;
    }

    printHand() {
        this.cardList.forEach( card => {
            card.toString();
        });
    }
}

export { Hand }












