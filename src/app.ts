// bind this
function autobind(_: any, __: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value; // get the original method function
  const newDescriptor: PropertyDescriptor = {
    get() {
      return method.bind(this); // bind the method to this
    }
  };
  return newDescriptor;
}

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

    if (
      !title.trim() ||
      !description.trim() ||
      !people.trim()
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

const input = new ProjectInput();

// const formElement = (<HTMLTemplateElement>document.getElementById('project-input')!).content;
// const projectElement = (<HTMLTemplateElement>document.getElementById('single-project')!).content;
// const listElement = (<HTMLTemplateElement>document.getElementById('project-list')!).content;

// const app = <HTMLDivElement>document.getElementById('app')!;
// app.appendChild(formElement);
// app.appendChild(listElement);

// const form1 = <HTMLFormElement>document.querySelector('form')!;
// form1.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const title = <HTMLInputElement>document.getElementById('title')!;
//   const description = <HTMLInputElement>document.getElementById('description')!;
//   const people = <HTMLInputElement>document.getElementById('people')!;


// });
