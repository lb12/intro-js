'use strict';

import { convert as romanToArab } from './roman_to_arab_conversor';
import { convert as arabToRoman } from './arab_to_roman_conversor';


main();

function main() {
    console.log('\n* Roman to Arab *\n');
    romanToArab('XVII');
    romanToArab('XIX');
    romanToArab('XIV');
    romanToArab('XLIX');
    romanToArab('MCD');
    romanToArab('MMMCMXCIX');
    romanToArab('IVI');
    romanToArab('xxx');
    romanToArab('xl');
    
    console.log('\n * Arab to Roman *\n');
    arabToRoman(1);
    arabToRoman(74);
    arabToRoman(99);
    arabToRoman(125);
    arabToRoman(475);
    arabToRoman(999);
    arabToRoman(1231);
    arabToRoman(3999);
    arabToRoman('jeje');
    arabToRoman(0);
    arabToRoman(4000);
}