/// <reference path="baseComponents.ts" />

namespace App {
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
  }
}
