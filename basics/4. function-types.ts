function add(number1: number, number2: number): number {
  return number1 + number2;
};

function printResult(num: number): void {
  console.log('Result is: ' + num);
};

let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = printResult; //this will error compile

function addAndHandle(
  n1: number,
  n2: number,
  cb: (num: number) => void // <== it will ignore whether the callback return anything
) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(2, 3));
console.log(combineValues(7, 7));

addAndHandle(2, 4, (num) => { // <== dont need to specify the callback's parameter type
  console.log(num);
  return num; // <== you can still return anything eventough the type is void (must 'void')
})