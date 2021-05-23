namespace App {
  // Project Status Type
  export enum ProjectStatus {
    Active,
    Finish
  }

  // Project
  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) { }
  }
}