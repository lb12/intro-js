'use strict';

let suits = {
  'S' : 'Spades',
  'H' : 'Hearts',
  'C' : 'Clubs',
  'D' : 'Diamonds'
};

let valuesDictionary = {
  toValues: {
    2   : '2' ,
    3   : '3' ,
    4   : '4' ,
    5   : '5' ,
    6   : '6' ,
    7   : '7' ,
    8   : '8' ,
    9   : '9' ,
    'T' : '10',
    'J' : '11',
    'Q' : '12',
    'K' : '13',
    'A' : '14'
  },
  toCard: {
    '1'  : 'A' ,
    '2'  :  2  ,
    '3'  :  3  ,
    '4'  :  4  ,
    '5'  :  5  ,
    '6'  :  6  ,
    '7'  :  7  ,
    '8'  :  8  ,
    '9'  :  9  ,
    '10' :  'T',
    '11' :  'J',
    '12' :  'Q',
    '13' :  'K',
    '14' :  'A'
  }
};

let plays = {
  0 : 'Higher card',
  1 : 'Pair',
  2 : 'Double Pair',
  3 : 'Three of a Kind',
  4 : 'Straight',
  5 : 'Flush',
  6 : 'Full',
  7 : 'Poker',
  8 : 'Straight Flush'
};



function lowestToHighest(a, b) {
  const valueA = parseInt(a.value);
  const valueB = parseInt(b.value);
  
  return (valueA > valueB) ? 1 : ( (valueA < valueB) ? -1 : 0 );
}

export {
  suits, valuesDictionary, lowestToHighest, plays
}