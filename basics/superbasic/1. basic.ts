const adder = (
  num1: number,
  num2: number,
  showBool: boolean,
  stringTemplate: string
) => {
  const calc = num1 + num2;
  if (showBool) {
    return stringTemplate + calc;
  }
}; 

const number1 = 5;
const number2 = 2.5;
const bool = true;
let template: string;
template = 'Result is: '

const calc = adder(number1, number2, bool, template);
console.log(calc);
