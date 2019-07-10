'use strict';

import { PlayGame } from "./game";


let hand1 = 'AH,AC,AD,AS,4H';
//hand1 = 'AH,2H,7H,5H,4H';
//hand1 = 'AH,AC,AD,AS,AH'; // Forced error repeated card
hand1 = '2H,3S,4D,5H,6C';
hand1 = '5H,3S,4D,2H,AC';
hand1 = '2D,3S,3D,2H,6C';
let hand2 = '6C,9D,7H,3S,9H';
hand2 = '2H,3C,4S,5C,6D';
hand2 = '2H,3C,4S,5C,AD';
hand2 = '2H,3C,4S,5C,6D';
hand2 = '2H,2C,3S,3C,6D';
hand2 = '2H,2C,3S,3C,7D';

PlayGame(hand1, hand2);