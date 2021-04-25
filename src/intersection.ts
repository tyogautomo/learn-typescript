type Employee = {
  name: string;
  startDate: Date;
};

type Admin = {
  name: string;
  privileges: string[]
};

type ElevatedEmployee = Employee & Admin; // <== if the combine between object, will add

const employee1: ElevatedEmployee = {
  name: 'Tony',
  startDate: new Date(),
  privileges: ['write']
}

//=================== example 2 ========================

type StringNumber = string | number;
type Switch = number | boolean;
type Universal = StringNumber & Switch; // <== if the combine between union, will intersect

let something: Universal = 2;
