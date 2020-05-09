import {PddAssembly} from "../index";

const pddAssembly = new PddAssembly({
  url: 'ws://localhost:5000'
});

console.log(pddAssembly.defaultPrinter);

pddAssembly.printCommit({
  printer: '',
  documents: [{
    documentID: '',
    contents: [{
      encryptedData: '',
      signature: '',
      ver: '',
      templateUrl: '',
      userid: '',
      addData: {
        sender: {
          address: {
            province: '',
            city: '',
            district: '',
            town: '',
            detail: '',
          },
          name: '',
          phone: '',
          mobile: '',
        }
      },
    }, {
      data: {
        name: ''
      },
      templateURL: '',
    }],
  }]
})
