'use strict'
import { romanToArab as dictionary } from './utils';


// Main method that validate if the @param(romanNumber) is a good roman number.
function validate( romanNumber ) {
    if ( !useRomanNumbersOnly(romanNumber) ||
         !isValidOrderRule(romanNumber)    ||
         !isValid1stRule(romanNumber)      || 
         !isValid2ndRule(romanNumber)      ||
         !isValid3rdRule(romanNumber)      ||
         !isValid4thRule(romanNumber)) 
        return false;

    return true;
}

// Rules checking

function useRomanNumbersOnly( romanNumber ) {
    let romanNumberToken = /[IiVvXxLlCcDdMm]+/;
    return romanNumberToken.test(romanNumber);
}

// Special method that checks if the pattern IVI-IXI, XLX-XCX, CDC-CMC is present in the roman number.
function isValidOrderRule(romanNumber) {
    let romanSplitted = romanNumber.split('');
    let items = ['I', 'X', 'C'];

    let patternIsNotPresent = true;

    if(romanSplitted.length > 2) {
        for(let index = 0; index < romanSplitted.length; index++) {
            let element = romanSplitted[index];
            if(items.includes(element)) {
                switch(element) {
                    case 'I':
                        patternIsNotPresent = !checkSpecialCase(romanSplitted.slice(index + 1, index + 3), ['I', 'V', 'X']); // IVI or IXI
                        break;
                    case 'X':    
                        patternIsNotPresent = !checkSpecialCase(romanSplitted.slice(index + 1, index + 3), ['X', 'L', 'C']); // XLX or XCX
                        break;
                    case 'C':
                        patternIsNotPresent = !checkSpecialCase(romanSplitted.slice(index + 1, index + 3), ['C', 'D', 'M']); // CDC or CMC
                        break;
                }
            }
            if(!patternIsNotPresent) break; // Pattern was found in the roman number 
        }
    }
    return patternIsNotPresent;
}

// Repeat items at most 3 times
function isValid1stRule(romanNumber) {
    let items = ['I', 'X', 'C', 'M'];
    return checkRepeatAtMostNTimes(romanNumber, items, 3);
}

// Repeat items at most 1 time
function isValid2ndRule(romanNumber) {
    let items = ['V', 'L', 'D'];
    return checkRepeatAtMostNTimes(romanNumber, items, 1);
}

// Items can only precede their 2 successors ( I->V,X ; X->L,C ; C->D,M )
function isValid3rdRule(romanNumber) {
    let romanSplitted = romanNumber.split('');
    let items = ['I', 'X', 'C'];
    let success = true;

    romanSplitted.forEach( (element, index) => {
        if(items.includes(element)) {
            let nextElementValue = dictionary[ romanSplitted[ index + 1 ] ];
            let currentElementValue = dictionary[element];

            if( nextElementValue > (currentElementValue * 10) )
                success = false;
        }        
    });

    return success;
}

// Items can only precede a higher roman number
function isValid4thRule(romanNumber) {
    let items = ['V', 'L', 'D'];
    return checkIfRightElementIsHigher(romanNumber, items);
}



// Aux checking methods
function checkSpecialCase (romanSplitted, items) {
    return (romanSplitted[0] === items[1] || romanSplitted[0] === items[2]) && romanSplitted[1] === items[0];
}

function checkRepeatAtMostNTimes( romanNumber, items, limit ){
    let romanSplitted = romanNumber.split('');
    let counter;
    let success = true;
    
    items.forEach( element => {
        counter = 0;
        romanSplitted.forEach( (romanChar, index) => {
            if ( counter === limit ) {
                success = false;
            }

            if( romanChar === element ) {
                if ( romanChar === romanSplitted[index + 1] ) {
                    counter++;
                }
            } else {
                counter = 0;
            }
        });
    });

    return success;
}

function checkIfRightElementIsHigher(romanNumber, items) {
    let romanSplitted = romanNumber.split('');
    let success = true;

    romanSplitted.forEach( (element, index) => {
        if( items.includes(element) && romanSplitted[ index + 1 ] !== undefined) {
            let nextElement = romanSplitted[ index + 1 ];
            if( dictionary[element] < dictionary[nextElement] ) {
                success = false;
            }
        }
    });

    return success;
}


export { validate as isRomanValidator };