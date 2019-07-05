'use strict';

import { arabToRoman as dictionary, isArabNumber } from './utils';


let input = [];
let output;

function convert(number) {
    if (!isArabNumber( number ) || number < 1 || number > 3999) {
        console.error( `'${number}' is not a valid arab number.` );
        return ;
    }

    //Here we know the input is ok to be converted
    init(number);
    conversionProcess();
    printResult(number);
}

function init(number) {
    input = splitIntoArrayOfNumbers(number); // eg: 125 = [1,2,5]
    output = "";
}

//Aux method
function splitIntoArrayOfNumbers( number ){
    return number.toString()
        .split('')
        .map( charNumber => parseInt(charNumber) );
}

function conversionProcess() {    
    let auxInput = input.slice(0).reverse()
                        .map( (number, index) => number * Math.pow(10, index))
                        .reverse(); // eg -> 125 = [1, 2, 5] = [100, 20, 5] = 100 + 20 + 5 = 125 

    auxInput.forEach(number => {
        // Iterate number until it is zero
        while ( number != 0 ) {
            for (const key in dictionary) {
                if( number < dictionary[key].arab || dictionary[ parseInt(key) + 1] === undefined) {
                    // If it is not the last index from dictionary, key is just 1 less.
                    let realIndex = (number < dictionary[key].arab) ? (parseInt(key) - 1) : key;
    
                    number-= dictionary[ realIndex ].arab;
                    output += dictionary[realIndex].roman;

                    break;
                }    
            }
        }
    });
}

function printResult() {
    input = input.join().replace(/,/g, '');
    console.log(`${input} = ${output}`);
}


export { convert };