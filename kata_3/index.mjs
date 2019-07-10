'use strict';

import { PlayGame } from "./game";


let hand1 = 'AH,AC,AD,AS,4H';
//hand1 = 'AH,2H,7H,5H,4H';
//hand1 = 'AH,AC,AD,AS,AH'; // Forced error repeated card
let hand2 = '6C,9D,7H,3S,9H';

PlayGame(hand1, hand2);