type Combinable = string | number; // <== type alias
type ConversionTypes = 'as-numbers' | 'as-text';

const combineThis = (
  input1: Combinable, // <== union type
  input2: Combinable,
  resultConversion: ConversionTypes // <== literal type
) => {
  let result: (string | number);
  if ((typeof input1 === 'number' && typeof input2 === 'number') || resultConversion === 'as-numbers') { // need condition, string + number cant on typescript
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
};

const result = combineThis(2, 'jojon', 'as-text');
const result2 = combineThis(2, 22, 'as-numbers');
const result3 = combineThis('2', '22', 'as-numbers');

console.log(result);
console.log(result2);
console.log(result3);
