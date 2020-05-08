import {PddAssembly} from "../index";

const pddAssembly = new PddAssembly({
  url: 'ws://localhost:5000'
});

console.log(pddAssembly.defaultPrinter);
pddAssembly.setPrinterConfig({
  printer: '',
});
