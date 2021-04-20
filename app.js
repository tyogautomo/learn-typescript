var add = function (num1, num2, showBool, stringTemplate) {
    var calc = num1 + num2;
    if (showBool) {
        return stringTemplate + calc;
    }
};
var number1 = 5;
var number2 = 2.5;
var bool = true;
var template;
template = 'Result is: ';
var result = add(number1, number2, bool, template);
console.log(result);
