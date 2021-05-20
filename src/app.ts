// Global States
class ProjectState {
  private static instance: ProjectState;
  private listeners: any[] = [];
  private projects: Project[] = [];

  private constructor() { } // create a singleton concept, source of truth

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      this.projects.length + 1,
      title,
      description,
      people,
      ProjectStatus.Active
    )

    this.projects.push(newProject);
    for (const listener of this.listeners) {
      listener([...this.projects]);
    }
  }

  addListener(listener: Function) {
    this.listeners.push(listener);
  }
}

const projectState = ProjectState.getInstance();

// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement
  projects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-list')!
    this.hostElement = <HTMLDivElement>document.getElementById('app')!;

    const templateClone = <DocumentFragment>this.templateElement.content.cloneNode(true);
    this.element = <HTMLElement>templateClone.firstElementChild!;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      this.projects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listId = `${this.type}-projects-list`;
    const listElement = <HTMLUListElement>document.getElementById(listId);
    for (const project of this.projects) {
      const item = document.createElement('li');
      item.textContent = project.title;
      listElement.appendChild(item);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;

    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// Project Status Type
enum ProjectStatus { Active, Finish }

// Project
class Project {
  constructor(public id: number, public title: string, public description: string, public people: number, public status: ProjectStatus) { }
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
    this.hostElement = <HTMLDivElement>document.getElementById('app')!;

    const templateClone = <DocumentFragment>this.templateElement.content.cloneNode(true);
    this.element = <HTMLFormElement>templateClone.firstElementChild!;

    this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title')!;
    this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description')!;
    this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people')!;
    this.element.id = 'user-input';

    this.configureListener();
    this.attachElement();
  }

  @autobind
  private onSubmit(e: Event) {
    e.preventDefault();
    const userInputs = this.gatherUserInput();
    if (userInputs) {
      const [title, description, people] = userInputs;
      // console.log(title, description, people);
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

  private configureListener() {
    this.element.addEventListener('submit', this.onSubmit);
  }

  private attachElement() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
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
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
