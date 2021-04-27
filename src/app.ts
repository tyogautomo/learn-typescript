const paragraph = document.querySelector('p'); // TS will know it is a HTMLParagraphElement
const paraById = document.getElementById('message-content'); // TS will this as HTMLElement

// const usernameInput = document.getElementById('input-username')! as HTMLInputElement; // tell TS that this element will never null (!) and type casting it as input element
const usernameInput = <HTMLInputElement>document.getElementById('input-username')!; // usage #2

usernameInput.value = 'tono';

//============ Dynamic Properties Interface =================

interface ErrorContainer {
  [key: string]: string
}

let errorMessage: ErrorContainer;

errorMessage = {
  username: 'Username must be filled'
}

//================ Funtion Overloads ====================

type Combinable = string | number;
type Numeric = number | boolean;
type Universe = Combinable & Numeric;

function addThis(a: number, b: number): number;         // function overloading
function addThis(a: string, b: string): string;
function addThis(a: string, b: number): string;
function addThis(a: number, b: string): string;
function addThis(a: Combinable, b?: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b?.toString();
  }
  return b ? a + b : a;
}

// const result = <string>addThis('Carl', 'Maxis'); // you can casting it to know that the result is a string
const result = addThis('Carl', 1);
const splitted = result.split(''); // split now exist in result bcs of fn overloading

//================ Null Coalescing  ====================

const userInput = '';
const storedData = userInput ?? 'default value'; // ?? will only check undefined or null, nothing else

