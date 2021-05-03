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

})