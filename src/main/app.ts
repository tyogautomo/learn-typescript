/// <reference path="states/projectState.ts" />
/// <reference path="interfaces/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="helpers/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/baseComponents.ts" />
/// <reference path="components/projectInput.ts" />
/// <reference path="components/projectList.ts" />

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
