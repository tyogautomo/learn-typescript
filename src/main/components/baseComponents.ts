namespace App {
  // ============== BASE CLASS ==============
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}
