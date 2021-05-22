/// <reference path="drag-drop-interfaces.ts" />

namespace App {
  // Global States
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>) {
      this.listeners.push(listener);
    }
  }

  class ProjectState extends State<Project> {
    private static instance: ProjectState;
    private projects: Project[] = [];

    private constructor() {
      super();
    } // create a singleton concept, source of truth

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.Active
      )

      this.projects.push(newProject);
      this.updateListener();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(prj => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListener();
      }
    }

    private updateListener() {
      for (const listener of this.listeners) {
        listener([...this.projects]);
      }
    }
  }

  const projectState = ProjectState.getInstance();

  // ============== BASE CLASS ==============
  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newELementId?: string
    ) {
      this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!
      this.hostElement = <T>document.getElementById(hostElementId)!;

      const templateClone = <DocumentFragment>this.templateElement.content.cloneNode(true);
      this.element = <U>templateClone.firstElementChild!;
      if (newELementId) {
        this.element.id = newELementId;
      }

      this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtStart ? 'afterbegin' : 'beforeend',
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }

  // ProjectList Class
  class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DropTarget {
    projects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.configure();
      this.renderContent();
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('drop', this.dropHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      projectState.addListener((projects: Project[]) => {
        const currentProjects = projects.filter(prj => {
          if (this.type === 'active') {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finish;
        });
        this.projects = currentProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    @autobind
    dragOverHandler(e: DragEvent) {
      if (e.dataTransfer && e.dataTransfer!.types[0] === 'text/plain') {
        e.preventDefault();
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.add('droppable');
      }
    }

    @autobind
    dropHandler(e: DragEvent) {
      const projectId = e.dataTransfer!.getData('text/plain');
      projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finish);
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
      const listElement = this.element.querySelector('ul')!;
      listElement.classList.remove('droppable')
    }

    private renderProjects() {
      const listId = `${this.type}-projects-list`;
      const listElement = <HTMLUListElement>document.getElementById(listId);
      listElement.innerHTML = '';
      for (const project of this.projects) {
        new ProjectItem(listId, project);
      }
    }
  }

  // Project Status Type
  enum ProjectStatus { Active, Finish }

  // Project
  class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) { }
  }

  class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get person() {
      return this.project.people > 1 ? `${this.project.people} People` : '1 Person';
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.person + ' assigned.';
      this.element.querySelector('p')!.textContent = this.project.description;
    }

    @autobind
    dragStartHandler(e: DragEvent) {
      e.dataTransfer!.setData('text/plain', this.project.id);
      e.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
      console.log('Drag ended.')
    }
  }

  // ProjectInput Class
  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
