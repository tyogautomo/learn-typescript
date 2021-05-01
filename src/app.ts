const Logger: Function = (constructor: Function): void => {
  console.log('loggin on Mutant class...');
}

@Logger
class Mutant {
  name = "Tonol";

  constructor() {
    console.log('Creating an instance...');
  }
}

const monster: Mutant = new Mutant();

console.log(monster);
