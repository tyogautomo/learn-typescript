enum Roles {
  ADMIN,
  READ_ONLY,
  WRITE
}

const person1: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]
} = {
  name: 'agoy ter',
  age: 27,
  hobbies: ['mancing', 'tidur'],
  role: [1, 'programmer']
};

const person2: {
  name: string;
  age: number;
  hobbies: string[];
  role: Roles
} = {
  name: 'agoy ter',
  age: 27,
  hobbies: ['mancing', 'tidur'],
  role: Roles.ADMIN
};

person1.role.push('jdwa'); // still can push on tupple
// person.role = [1, 'jajaawd', 'awd']; // but assignment > 2 element will error

let favoriteActivities: (string)[];
favoriteActivities = ['mancing']

console.log(person1.name);

for (const hobby of person1.hobbies) {
  console.log(hobby.toUpperCase()); // will automaticaly complete function
  // hobby.forEach() will error because typescript know its not an array
}
