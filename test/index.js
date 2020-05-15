import { PddAssembly } from '../src/index';

// eslint-disable-next-line no-unused-vars
const pddAssembly = new PddAssembly({
  url: 'ws://localhost:5000',
});

const button = document.querySelector('#getVersion');
button.addEventListener('click', () => {
  console.log('click', pddAssembly.version);
});
