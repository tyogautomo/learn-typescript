/// <reference path="baseComponents.ts" />
/// <reference path="projectItem.ts" />

namespace App {
  // ProjectList Class
  export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DropTarget {
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
}
