'use strict';

let suits = {
    'S' : 'Spades',
    'H' : 'Hearts',
    'C' : 'Clubs',
    'D' : 'Diamonds'
};

let cardValues = {
    '2' : 2,
    '3' : 3,
    '4' : 4,
    '5' : 5,
    '6' : 6,
    '7' : 7,
    '8' : 8,
    '9' : 9,
    '10' : 'T',
    '11' : 'J',
    '12' : 'Q',
    '13' : 'K',
    '14' : 'A'
};

function lowestToHighest(a, b) {
    const valueA = parseInt(a.value);
    const valueB = parseInt(b.value);
    
    return (valueA > valueB) ? 1 : ( (valueA < valueB) ? -1 : 0 );
  }

export {
    suits, cardValues, lowestToHighest
}