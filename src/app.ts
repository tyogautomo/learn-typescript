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

    this.configureListener();
    this.attachElement();
  }

  private onSubmit(e: Event) {

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
