"use strict";
let user;
user = '2';
user = false;
console.log(user);
// const createUser = (name): string => { // <== argumen type will error because 'any'. It only error on function arguments
//   return name;
// };
// createUser('tono');
const h1 = document.querySelector('h1'); // <== ! here is an exclamation key that tell this wont never null
h1.addEventListener('click', () => {
    console.log('clicked');
});
