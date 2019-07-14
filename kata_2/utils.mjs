'use strict';

// Dictionary Roman - Arab
let romanToArab = {
    I  : 1,
    IV : 4,
    V  : 5,
    IX : 9,
    X  : 10,
    XL : 40,
    L  : 50,
    XC : 90,
    C  : 100,
    CD : 400,
    D  : 500,
    CM : 900,
    M  : 1000
};

// Dictionary Arab - Roman
let arabToRoman = {
    0 : {
        roman: 'I',
        arab:  1
    },
    1 : {
        roman: 'IV',
        arab:  4
    },
    2 : {
        roman: 'V',
        arab:  5
    },
    3 : {
        roman: 'IX',
        arab:  9
    },
    4 : {
        roman: 'X',
        arab:  10
    },
    5 : {
        roman: 'XL',
        arab:  40
    },
    6 : {
        roman: 'L',
        arab:  50
    },
    7 : {
        roman: 'XC',
        arab:  90
    },
    8 : {
        roman: 'C',
        arab:  100
    },
    9 : {
        roman: 'CD',
        arab:  400
    },
    10 : {
        roman: 'D',
        arab:  500
    },
    11 : {
        roman: 'CM',
        arab:  900
    },
    12 : {
        roman: 'M',
        arab:  1000
    },
};

// Method that checks if a number is arab
function isArabNumber( number ) {
    return Number.isInteger(number);
}

export { 
    romanToArab, 
    arabToRoman,
    isArabNumber    
};