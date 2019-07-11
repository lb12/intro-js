'use strict';

import { PlayGame } from "./game";

let possibleHands = {
    repeatedCardError: 'AH,AC,AD,AS,AH',
    poker: 'AH,AC,AD,AS,4H',
    straight: '2H,3S,4D,5H,6C',
    flush: 'AH,2H,7H,5H,4H',
    lowStraight: '5H,3S,4D,2H,AC',
    doublePair: '2D,3S,3D,2H,6C',
    full: 'JD,KS,JD,JH,KC',
    pair: 'QD,KH,4S,8D,QC',
    threeOfAKind: 'AH,4C,2D,AS,AC',
    straightFlush: '9H,TH,JH,QH,KH'
};

// hand1 = '2D,3S,3D,2H,6C';
// let hand2 = '6C,9D,7H,3S,9H';
// hand2 = '2H,3C,4S,5C,6D';
// hand2 = '2H,3C,4S,5C,AD';
// hand2 = '2H,3C,4S,5C,6D';
// hand2 = '2H,2C,3S,3C,6D';
// hand2 = '2H,2C,3S,3C,7D';

PlayGame(possibleHands.repeatedCardError, possibleHands.poker);