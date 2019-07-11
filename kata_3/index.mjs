'use strict';

import { PlayGame } from "./game";

// Testing purpose
let possibleHands = {
    goodHands : {
        straightFlush: '9H,TH,JH,QH,KH',
        poker: 'AH,AC,AD,AS,4H',
        full: 'JD,KS,JD,JH,KC',
        flush: 'AH,2H,7H,5H,4H',
        straight: '2H,3S,4D,5H,6C',
        lowStraight: '5H,3S,4D,2H,AC',
        threeOfAKind: 'AH,4C,2D,AS,AC',
        doublePair: '2D,3S,3D,2H,6C',
        pair: 'QD,KH,4S,8D,QC',
        higherCard: '2H,6D,4C,9H,JS'
    },
    badHands : {
        repeatedCardError: 'AH,AC,AD,AS,AH',
        noStringHand: 5,
        badCards: '5S,4X,5C,1D,9H',

    },
    practiceHands: {
        example1 : {
            p1 : '2H,3D,5S,9C,KD',
            p2 : '2C,3H,4S,8C,AH'
        },
        example2 : {
            p1 : '2H,4S,4C,2D,4H',
            p2 : '2S,8S,AS,QS,3S'
        },
        example3 : {
            p1 : '2H,3D,5S,9C,KD',
            p2 : '2C,3H,4S,8C,KH'
        },
        example4 : {
            p1 : '2H,3D,5S,9C,KD',
            p2 : '2D,3H,5C,9S,KH'
        }     
    }
};

// Main
playPracticeExamples();
playBadHandsWithErrors();

function playPracticeExamples() {
    console.log('Example 1:\n');
    PlayGame(possibleHands.practiceHands.example1.p1, possibleHands.practiceHands.example1.p2);
    console.log('Example 2:\n');
    PlayGame(possibleHands.practiceHands.example2.p1, possibleHands.practiceHands.example2.p2);
    console.log('Example 3:\n');
    PlayGame(possibleHands.practiceHands.example3.p1, possibleHands.practiceHands.example3.p2);
    console.log('Example 4:\n');
    PlayGame(possibleHands.practiceHands.example4.p1, possibleHands.practiceHands.example4.p2);
}

function playBadHandsWithErrors() {
    PlayGame(possibleHands.badHands.repeatedCardError, possibleHands.badHands.badCards);
}