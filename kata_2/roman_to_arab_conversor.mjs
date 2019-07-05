'use strict';

import { romanToArab as dictionary, isRomanNumber } from './utils';

let input = [];
let output = 0;


function convert(romanNumber) {
    // TODO: Check good roman number with function
    // Function call goes here

    //Here we know the input is ok to be converted
    
    init(romanNumber);

    conversionProcess();
    printResult(romanNumber);
}


function init( romanNumber ) {
    input = romanNumber.split('');
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
    console.log(romanNumber + " = " + output);
}


export { convert }