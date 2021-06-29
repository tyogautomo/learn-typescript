import { ProjectInput } from './components/projectInput'; // you need to specify extension name if didnt use Webpack
import { ProjectList } from './components/projectList';

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
