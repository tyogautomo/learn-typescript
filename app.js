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
printResult(add(2, 3));
console.log(combineValues(7, 7));
