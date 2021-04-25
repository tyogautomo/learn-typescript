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

function printForceInfo(force: Force) {
  console.log(force.name);
  if ('startDate' in force) {
    console.log(force.startDate);
  }
  if ('skills' in force) {
    console.log(force.skills);
  }
};

printForceInfo(tesserac);
