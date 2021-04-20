"use strict";
function add(number1, number2) {
    return number1 + number2;
}
;
function printResult(num) {
    console.log('Result is: ' + num);
}
;
var combineValues;
combineValues = add;
// combineValues = printResult; //this will error compile
function addAndHandle(n1, n2, cb // <== it will ignore whether the callback return anything
) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(2, 3));
console.log(combineValues(7, 7));
addAndHandle(2, 4, function (num) {
    console.log(num);
    return num; // <== you can still return anything eventough the type is void (must 'void')
});
