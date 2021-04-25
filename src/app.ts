type Trooper = {
  name: string;
  startDate: Date
};

type Jedi = {
  name: string;
  skills: string[];
};

type Force = Trooper | Jedi;

const tesserac: Force = {
  name: 'Unknown Orbs',
  startDate: new Date(),
  skills: ['absorbing']
}

const crystalRed: Force = {
  name: 'Red Crystal',
  skills: ['venom']
}

function printForceInfo(force: Force) {
  console.log(force.name);
  if ('startDate' in force) { // type guarding
    console.log(force.startDate);
  }
  if ('skills' in force) { // type guarding
    console.log(force.skills);
  }
  console.log('//===========================//')
};

printForceInfo(tesserac);
printForceInfo(crystalRed);

//============================ Class Case ===============================

class Car {
  drive() {
    console.log('driving a car...');
  }
}

class Truck {
  drive() {
    console.log('driving a truck...');
  }

  loadPackage() {
    console.log('loading a package...');
  }
}

type Vehicle = Car | Truck;

const useVehicle = (vehicle: Vehicle) => {
  if (vehicle instanceof Truck) { // kind of type guarding
    vehicle.loadPackage(); // if guarding not given, this loadPackage method will not exist
  }
  vehicle.drive();
  console.log('//=============================//');
};

useVehicle(new Car());
useVehicle(new Truck());
