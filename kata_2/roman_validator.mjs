'use strict'
import { romanToArab as dictionary, isRomanNumber } from './utils';


let goodNumbers = [
    'XVII',
    'XIX',
    'XIV',
    'XLIX',
    'MCD',
    'MMMCMXCIX'
];

let badNumbers = [
    'VV',
    'XXXX',
    'VX',
    'DDX',
    'DMX',
    'IVI',
    'CMC',
    'XIICDC',
    'IC'
];

badNumbers.forEach(element => {
    console.log(element + ' ? ' + validate(element));
});


function validate( romanNumber ) {
    if ( !isValidOrderRule(romanNumber) ||
         !isValid1stRule(romanNumber)   || 
         !isValid2ndRule(romanNumber)   ||
         !isValid4thRule(romanNumber)) 
        return false;
    
    if(!isValidOrderRule(romanNumber)) return false;


    return true;
}

// Rules checking

function isValidOrderRule(romanNumber) {
    let romanSplitted = romanNumber.split('');

    let success = true;

    if(romanSplitted.length >= 3) {
        if (romanNumber.toString().includes('I') ||
            romanNumber.toString().includes('X') ||
            romanNumber.toString().includes('C') ) {
            romanSplitted.forEach( (element, index) => {
                switch(element) {
                    case 'I':
                        success = checkSpecialCase(romanSplitted.slice(index + 1, index + 3), ['X', 'L', 'C']); // IVI or IXI
                        break;
                    case 'X':                         
                        success = checkSpecialCase(romanSplitted.slice(index + 1, index + 3), ['X', 'L', 'C']); // XLX or XCX
                        break;
                    case 'C':
                        success = checkSpecialCase(romanSplitted.slice(index + 1, index + 3), ['C', 'D', 'M']); // CDC or CMC
                        break;
                    default:
                        break;
                }
            });
        }
    }
    return success;
}

function isValid1stRule(romanNumber) {
    let items = ['I', 'X', 'C', 'M'];
    return checkRepeatAtMostNTimes(romanNumber, items, 3);
}

function isValid2ndRule(romanNumber) {
    let items = ['V', 'L', 'D'];
    return checkRepeatAtMostNTimes(romanNumber, items, 1);
}

function isValid4thRule(romanNumber) {
    let items = ['V', 'L', 'D'];
    return checkIfRightElementIsHigher(romanNumber, items);
}



// Aux checking methods
function checkSpecialCase (romanSplitted, items) {
    return !(romanSplitted[0] === items[1] || romanSplitted[0] === items[2]) && romanSplitted[1] === items[0];
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


export { validate };