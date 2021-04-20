const add = (
  num1: number,
  num2: number,
  showBool: boolean,
  stringTemplate
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

const result = add(number1, number2, bool, template);
console.log(result);
