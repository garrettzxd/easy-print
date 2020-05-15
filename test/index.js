import { PddAssembly } from '../src/index';

const pddAssembly = new PddAssembly({
  url: 'ws://localhost:5000',
});

console.log('test index');
pddAssembly.getVersion((data) => {
  console.log(data.AppVersion);
});
