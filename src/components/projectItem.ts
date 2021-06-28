import { Project } from '../models/project.js';
import { Draggable } from '../models/drag-drop.js';
import { autobind } from '../decorators/autobind.js';
import { Component } from '../components/baseComponents.js';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
