function Require() { };

function PositiveNumber() { };

function validate(obj: object): boolean {
  return false;
}

class Course {
  @Require
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const form = <HTMLFormElement>document.querySelector('form')!;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleEl = document.getElementById("coursetitle")! as HTMLInputElement;
  const priceEl = document.getElementById("price")! as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const course = new Course(title, price);

  if (!validate(course)) {
    throw new Error('Validation failed');
  }

  console.log(course);
})