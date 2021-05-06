class Course {
  title: string;
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
  console.log(course);
})