'use strict';

import { romanToArab as dictionary } from './utils';
import { isRomanValidator as isRomanNumber } from './roman_validator';

let input = [];
let output = 0;


// Main method that converts a roman to arab number
function convert(romanNumber) {
    if (!isRomanNumber( romanNumber )) {
        console.error( `'${romanNumber}' is not a valid roman number.` );
        return ;
    }

    //Here we know the input is ok to be converted
    
    init(romanNumber);

    conversionProcess();
    printResult(romanNumber);
}


function init( romanNumber ) {
    input = romanNumber.toUpperCase().split('');
    output = 0;
}


function conversionProcess(){
    let auxOutput = [];

    for ( let i = 0; i < input.length; i++ ) {
        let actualValue = dictionary[ input[i] ] ;
        let nextValue = dictionary[ input[i + 1] ] ;
        
        if(nextValue === undefined) { // Exit condition
            auxOutput[i] = actualValue;
            addResults(auxOutput);
            break;
        }        
        auxOutput[ i ] = (nextValue > actualValue) ? -actualValue : actualValue;
    }
}


function addResults(auxOutput) {
    auxOutput.forEach(element => {
        output += parseInt(element);
    });
}


function printResult(romanNumber) {
    console.log(romanNumber.toUpperCase() + " = " + output);
}


export { convert }