let list: Array<string> = []; // built in generics in typesscript
const promise = new Promise<string>((resolve, reject) => {
  resolve('something');
})
list.push('');

promise
  .then(result => {
    result.split(''); // if the promise using string generic, it will know to use split
  });

function merge<T extends object, U extends object>(objA: T, objB: U) { // extends means constraint, to tell that the argument must be an object
  let merged = { ...objA, ...objB, something: 'someone' };
  return merged;
};

const objA = {
  name: 'Suryono',
  welldone: 'done'
};

const objB = {
  age: 23
};

const mergedObj = merge(objA, objB);

mergedObj.something; // they know if the return value have 'something' key;

type Lengthy = {
  length: number;
}

function countAndDescribe<T extends (string | Array<any>)>(element: T): [T, string] {
  let descriptor = 'We got no value.';
  if (element.length === 1) {
    descriptor = 'We got 1 value';
  } else if (element.length > 1) {
    descriptor = `We got ${element.length} value`;
  }
  return [element, descriptor];
};

console.log(countAndDescribe('this is not'));

// ==================== keyof CONSTRAINT =======================

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extractAndConvert({ jobless: true }, 'jobless'));
