"use strict";
var combineThis = function (input1, // <== union type
input2, resultConversion // <== literal type
) {
    var result;
    if ((typeof input1 === 'number' && typeof input2 === 'number') || resultConversion === 'as-numbers') { // need condition, string + number cant on typescript
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
};
var result = combineThis(2, 'jojon', 'as-text');
var result2 = combineThis(2, 22, 'as-numbers');
var result3 = combineThis('2', '22', 'as-numbers');
console.log(result);
console.log(result2);
console.log(result3);
