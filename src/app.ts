const inputTemplate = <HTMLTemplateElement>document.getElementById('project-input')!;
const inputContent = inputTemplate.content;

const app = <HTMLDivElement>document.getElementById('app')!;
app.appendChild(inputContent);
