/// <reference path="./states/projectState.ts" />
/// <reference path="./interfaces/drag-drop.ts" />
/// <reference path="./models/project.ts" />
/// <reference path="./helpers/validation.ts" />
/// <reference path="./decorators/autobind.ts" />

namespace App {
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

  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
