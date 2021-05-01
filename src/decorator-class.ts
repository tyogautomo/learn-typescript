const Logger: Function = (logString: string): Function => (constructor: Function): void => { // create a decorator factory (returning a function)
  console.log(logString);
  console.log(constructor, ' <<<< constructor');
}

const WithTemplate = (template: string, htmlId: string) => (constructor: any) => {
  console.log('Rendering HTML element...')
  const element: HTMLElement = <HTMLDivElement>document.getElementById(htmlId);
  const construct = new constructor();
  if (element) {
    element.innerHTML = template; // inserting a template to that element
    element.querySelector('h1')!.textContent = construct.name; // asume that we always have h1 element inside that element
  }
}

//this decorators runs returned function from bottom to up

@Logger('LOGGING - MUTANT') // <== decorator: must return a function
@WithTemplate('<h1>This is Title from Decorator</h1>', 'title') // <== decorator: must return a function (this is like applied on Angular)
class Mutant {
  name = "Tonol";

  constructor() {
    console.log('Creating an instance neh..');
  }
}

const monster: Mutant = new Mutant();

console.log(monster);
