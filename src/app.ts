// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
    this.hostElement = <HTMLDivElement>document.getElementById('app')!;

    const templateClone = <DocumentFragment>this.templateElement.content.cloneNode(true);
    this.formElement = <HTMLFormElement>templateClone.firstElementChild!;

    this.titleInputElement = <HTMLInputElement>this.formElement.querySelector('#title')!;
    this.descriptionInputElement = <HTMLInputElement>this.formElement.querySelector('#description')!;
    this.peopleInputElement = <HTMLInputElement>this.formElement.querySelector('#people')!;
    this.formElement.id = 'user-input';

    this.configureListener();
    this.attachElement();
  }

  @autobind
  private onSubmit(e: Event) {
    e.preventDefault();
    const userInputs = this.gatherUserInput();
    if (userInputs) {
      const [title, description, people] = userInputs;
      console.log(title, description, people);
      this.clearInput();
    } else {
      alert('input failed, please try again.');
    }
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    const titleValidator: Validatable = {
      value: title,
      required: true,
      minLength: 1,
      maxLength: 20
    }
    const descValidator: Validatable = {
      value: description,
      required: true,
      minLength: 5,
      maxLength: 20
    }
    const peopleValidator: Validatable = {
      value: +people,
      required: true,
      max: 20,
      min: 1
    }

    if (
      !validator(titleValidator) ||
      !validator(descValidator) ||
      !validator(peopleValidator)
    ) {
      return;
    }
    return [title, description, +people];
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private configureListener() {
    this.formElement.addEventListener('submit', this.onSubmit);
  }

  private attachElement() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}

// validation helper
interface Validatable {
  value: string | number;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}

// decorator
function autobind(_: any, __: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value; // get the original method function
  const newDescriptor: PropertyDescriptor = {
    get() {
      return method.bind(this); // bind the method to this
    }
  };
  return newDescriptor;
}

const validator = (input: Validatable): boolean => {
  let isValid = true;
  if (input.required) {
    isValid = isValid && (input.value.toString().trim().length > 0);
  }
  if (typeof input.value === 'string') {
    if (input.maxLength != null) {
      isValid = isValid && (input.value.length <= input.maxLength);
    }
    if (input.minLength != null) {
      isValid = isValid && (input.value.length >= input.minLength);
    }
  }
  if (typeof input.value === 'number') {
    if (input.max) {
      isValid = isValid && (input.value <= input.max);
    }
    if (input.min) {
      isValid = isValid && (input.value >= input.min);
    }
  }
  return isValid;
}

const input = new ProjectInput();
