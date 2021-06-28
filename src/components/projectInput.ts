import { Component } from '../components/baseComponents.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../states/projectState.js';
import * as Validation from '../helpers/validation.js';

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title')!;
    this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description')!;
    this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people')!;
    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.onSubmit);
  }

  renderContent() { }

  @autobind
  private onSubmit(e: Event) {
    e.preventDefault();
    const userInputs = this.gatherUserInput();
    if (userInputs) {
      const [title, description, people] = userInputs;
      projectState.addProject(title, description, people);
      this.clearInput();
    } else {
      alert('input failed, please try again.');
    }
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    const titleValidator: Validation.Validatable = {
      value: title,
      required: true,
      minLength: 1,
      maxLength: 20
    }
    const descValidator: Validation.Validatable = {
      value: description,
      required: true,
      minLength: 5,
      maxLength: 20
    }
    const peopleValidator: Validation.Validatable = {
      value: +people,
      required: true,
      max: 20,
      min: 1
    }

    if (
      !Validation.validator(titleValidator) ||
      !Validation.validator(descValidator) ||
      !Validation.validator(peopleValidator)
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
}
