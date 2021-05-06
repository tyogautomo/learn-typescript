interface ValidatorConfig {
  [prop: string]: {
    [validateableProp: string]: string[]
  }
};

const registeredValidators: ValidatorConfig = {
  // Course: {
  //   title: ['required'],
  //   price: ['positive']
  // }
};

function Require(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
};

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
};

function validate(obj: any): boolean {
  const classValidatorConfig = registeredValidators[obj.constructor.name];
  if (!classValidatorConfig) {
    return true;
  }
  let check = true;
  for (const prop in classValidatorConfig) {
    for (const validator of classValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          check = check && !!obj[prop];
          break;
        case 'positive':
          check = check && obj[prop] > 0;
          break;
        default:
          break;
      }
    }
  }
  return check;
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
    alert('Invalid input, please try again!');
    return;
  }

  console.log(course, '<<<<<<<<<<<<<<');
})