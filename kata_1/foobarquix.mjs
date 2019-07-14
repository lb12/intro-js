"use strict";

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const dictionary = {
    3: "Foo",
    5: "Bar",
    7: "Quix"
}

let numberInput;
let output;


function translate(number) {
    init(number);

    if( !isInputGoodNumber() ) {
        return ;
    }

    printNamesIfNumberDivisible();
    printNamesIfNumberContained();
    setEmptyOutputLikeNumber();
    printOutput();    
}

// Initialize the variables that need it.
function init( number ){
    numberInput = number;
    output = "";
}

// Checks if the input is a good number.
function isInputGoodNumber() {
    if( !Number.isInteger(numberInput) ) {
        console.error("ERROR: Introduce un numero entero");
        return false;
    }

    if( numberInput < MIN_NUMBER || numberInput > MAX_NUMBER ) {
        console.error("ERROR: Introduce un numero entre el 1 y el 100 (incluidos)");
        return false;
    }

    return true;
}

// Prints value of the number if number is divisible.
function printNamesIfNumberDivisible() {
    for (let value in dictionary) {
        if ( (numberInput % value) === 0 ) {
            output += dictionary[value];
        }
    }
}

// Put the number name from dictionary in the output if is contained.
function printNamesIfNumberContained() {
    let auxInput = numberInput.toString().split("");

    auxInput.forEach(charNumber => {
        for (let value in dictionary) { 
            if(charNumber === value ) {
                output += dictionary[value];
                break;
           }
        }
    });
}

// Set the output to "" if number was not divisible by the 3 numbers.
function setEmptyOutputLikeNumber() {
    if ( output === "" )
        output = numberInput.toString();
}

function printOutput() {
    console.log(numberInput + " -> " + output);
}

export { translate as fooBarQuix };