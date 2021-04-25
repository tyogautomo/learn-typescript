"use strict";
let person1;
person1 = {
    name: 'Tony',
    // age: 12, // this will error, object literal must have the exact same property as interface
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    },
    walk: () => { }
};
person1.greet('Hello my name is');
class Person {
    constructor(name, age, sex, gender) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.gender = gender;
        this.cardId = '12312';
    }
    ; // age will not error
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
    changeCardId(id) {
        this.cardId = id;
    }
}
;
class Abnormal extends Person {
    walk() {
        console.log('Im walking haha');
        return 'walking'; // can return something even we abstract it as void
    }
}
let person2;
person2 = new Abnormal('Mikael', 24, 'm', 's');
console.log(person2);
person2.gender; // If its type refer to 'Biological', it only have 2 property
console.log(person2.cardId);
person2.changeCardId('311');
console.log(person2.cardId);
