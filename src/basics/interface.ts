interface addFn {
  (a: number, b: number): number // interface for function
}

let add: addFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};

//=====================================================//

interface Citizen {
  readonly cardId?: string; // question mark mean optional
}

interface Biological {
  sex: string,
  gender: string
}

interface Greetable extends Citizen, Biological {
  name: string;
  greet: (a: string) => void;
  walk: () => void;
  address?: string; // question mark mean optional
  eat?: () => void;
}

let person1: Greetable;
person1 = {
  name: 'Tony',
  // age: 12, // this will error, object literal must have the exact same property as interface
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`)
  },
  walk: () => { },
  cardId: 'asd',
  sex: 'mele',
  gender: 'straight'
};

person1.greet('Hello my name is');

class Person implements Greetable {
  cardId?: string;

  constructor(
    public name: string,
    public age: number,
    public sex: string,
    public gender: string,
    cardId?: string
  ) {
    if (cardId) {
      this.cardId = cardId;
    }
  }; // age will not error

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }

  showIdCard() {
    if (this.cardId) {
      console.log(`my id card is ${this.cardId}`);
    } else {
      console.log('I have no card ID.');
    }
  }

  changeCardId(id: string) {
    this.cardId = id;
  }

  walk() {

  };
};

class Abnormal extends Person {
  walk() {
    console.log('Im walking haha');
    return 'walking'; // can return something even we abstract it as void
  }
}

let person2: Abnormal;
person2 = new Abnormal('Mikael', 24, 'm', 's', '123123');
console.log(person2);

person2.gender; // If its type refer to 'Biological', it only have 2 property
console.log(person2.cardId);
person2.changeCardId('311');
console.log(person2.cardId);
person2.cardId = '3333' // this is weird, it still work, if we declare readonly on interface

const person3 = new Person('Mikael', 24, 'm', 's');
person3.showIdCard();