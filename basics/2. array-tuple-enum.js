"use strict";
var Roles;
(function (Roles) {
    Roles[Roles["ADMIN"] = 0] = "ADMIN";
    Roles[Roles["READ_ONLY"] = 1] = "READ_ONLY";
    Roles[Roles["WRITE"] = 2] = "WRITE";
})(Roles || (Roles = {}));
var person1 = {
    name: 'agoy ter',
    age: 27,
    hobbies: ['mancing', 'tidur'],
    role: [1, 'programmer']
};
var person2 = {
    name: 'agoy ter',
    age: 27,
    hobbies: ['mancing', 'tidur'],
    role: Roles.ADMIN
};
person1.role.push('jdwa'); // still can push on tupple
// person.role = [1, 'jajaawd', 'awd']; // but assignment > 2 element will error
var favoriteActivities;
favoriteActivities = ['mancing'];
console.log(person1.name);
for (var _i = 0, _a = person1.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase()); // will automaticaly complete function
    // hobby.forEach() will error because typescript know its not an array
}
