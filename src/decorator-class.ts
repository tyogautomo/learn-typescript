const Logger: Function = (logString: string): Function => (constructor: Function): void => { // create a decorator factory (returning a function)
  console.log(logString);
  console.log(constructor, ' <<<< constructor');
}

const WithTemplate = (template: string, htmlId: string) => (constructor: any) => { // the decorator function's argument depends on where it placed
  console.log('Rendering HTML element 1...')
  const element: HTMLElement = <HTMLDivElement>document.getElementById(htmlId);
  const construct = new constructor();
  if (element) {
    element.innerHTML = template; // inserting a template to that element
    element.querySelector('h1')!.textContent = construct.name; // asume that we always have h1 element inside that element
  }
}

const EnhanceConstruct = (template: string, htmlId: string) => <T extends { new(...args: any[]): { name: string } }>(originalClass: T) => { // this decorator replace our existing constructor
  return class extends originalClass {
    constructor(...args: any[]) {
      super(); // this will save the original constructor
      console.log('Rendering HTML element 2...')
      const element: HTMLElement = <HTMLDivElement>document.getElementById(htmlId);
      if (element) {
        element.innerHTML = template; // inserting a template to that element
        element.querySelector('h2')!.textContent = this.name; // asume that we always have h1 element inside that element
      }
    }
  }
}

//this decorators runs returned function from bottom to up

@Logger('LOGGING - MUTANT') // <== decorator: must return a function
@EnhanceConstruct('<h2>This is subtitle from constructor changer</h2>', 'title') // this bitch will run on instanciate
@WithTemplate('<h1>This is Title from Decorator</h1>', 'title') // <== decorator: must return a function (this is like applied on Angular)
class Mutant {
  name = "Baxigur";

  constructor() {
    console.log('Creating an instance neh..');
  }
}

const monster: Mutant = new Mutant();
console.log(monster);
