import { PddAssembly } from '../src/index';

const pddAssembly = new PddAssembly({
  url: 'ws://localhost:5000',
});

function setValue(id1, content) {
  const itemContent = document.querySelector(`#${id1}`);
  itemContent.innerHTML = content;
}

const button = document.querySelector('#getVersion');
button.addEventListener('click', () => {
  setValue('versionContent', pddAssembly.version);
});

const listButton = document.querySelector('#getPrinterList');
listButton.addEventListener('click', () => {
  const content = document.querySelector('#printerListContent');
  const contentDefault = document.querySelector('#printerDefault');
  content.innerHTML = JSON.stringify(pddAssembly.printerList);
  contentDefault.innerHTML = pddAssembly.defaultPrinter;
});

const getConfigButton = document.querySelector('#getPrinterConfig');
getConfigButton.addEventListener('click', () => {
  pddAssembly.getPrintConfig({ printer: pddAssembly.defaultPrinter }, (data) => {
    setValue('printerConfigContent', JSON.stringify(data));
  });
});

const setConfigButton = document.querySelector('#setPrinterConfig');
setConfigButton.addEventListener('click', () => {
  pddAssembly.setPrinterConfig({
    printer: pddAssembly.defaultPrinter,
    verticalOffset: 10,
    horizontalOffset: 20,
    isPrintBottomLogo: true,
    isPrintTopLogo: false,
  }, (data) => {
    setValue('setConfigRes', JSON.stringify(data));
  });
});

const printButton = document.querySelector('#printButton');
printButton.addEventListener('click', () => {
  pddAssembly.printCommit({
    printer: pddAssembly.defaultPrinter,
    documents: [{
      documentID: '9876543210',
      contents: [{
        encryptedData: 'c30e5fed4b713284d754a2bd00c7184e589fd4e54e6438e7572086b963c3eddb5f3b9ec31b8c014851aa313c3540c7416041eb30be22a47632ec15f62fc229192ef6c8a90053d51e44d30c5255a1fa6b53134f9677ad1366a07e898b4e827dfec027af0ea491cdfabf8ae383da40a4976689955cdc2c07c9d16948beaad43c60f1d2f7e4931b96148324b38c74c49c992516e74e8178ef63a1391f73821ba3b3d3738f1f8c4a4ee25ac808ba454a6ce02338650a5e8c3509ce058907dd520ad38e81241bf652bff985db82af2284cc56e0f8035a8db8c734557b16f192fa11515fcfa164d9ae07ac10b09e3de72b50348aa66d059057431db5e26f444a0a38f6782c0ed835fbb8456d98184612553387e7b11e0f3ede37ce4b8b215921e5a46848da02ea4c7ff876b318bf51f52acbd6260666a05166f7a7a8a177fadd06adfc1b5526f666f8cb333495a4cd81744d4204d9ee69edfda57578e77fd98029773342b75424d581f23ca889a0c767a7cc8787bcacae5aad85ef9d3ef8b9684f6e4a9bbd906f48182e05161ceb8a9022fcd77523fed7a006d08a788420054df276a9a5fca60d89f126699619c69f4807c825a38d49cd94332b0f81def64e75f980ef2c10212f8b34cc2c118ca9b820c52705716d249013df008d5deebc48951dac1fe9fa02efc9b739979dc3627313cf3230ca767fa9b1d9426d04b4c04884e74432a14a6bcca1d08f993ebc582177f7740d57d173abce4bcde94707e936f794570a1edbe812a79a257e31d6094e15e17aeee989f9402e3905658ad6d26fe9897b75c5c9eab9fc037b932b1e0fae9cf558b3d0e65bf087267cd5e1a551e79483880c5e3893170230b7fa6f4053ba9db626f075e571e0202f0af68ce7c7a037228352ee7c4d8f65b172abeb4d450543bc68f2587f1134236e8e000b463f50b937568b403ee662ee46ef0280c94fa53b9b639f6b3db05c2fc7e636ba6da29536629ce3d2bf0169adcc71997be33e2e252f3a6707029814c5b7e3190ea59f44c57e98ed5a6139fe7d8907a853e790f3794d4f8f6c6c20afa3bfec8857d130b4664d42ceb5f5bb0148510723ea8271ffcb6e5937',
        signature: 'SSSi+7sx2y+w4hqAQZoKuE3vmhkkJ4yXjc56x3fnzO7SxsRN9U3XxOc3FPuijEjqX6w3aFht2zkIVWHAuwrXhFKYvfddFz7NS0gnUoebtU0aqu3+Evlr0j3T9uhiFJOCYh58kwjeGM+UpuO6ky/09nIghKhCeCabJvak20M6CLo=',
        ver: '3',
        templateUrl: 'https://t16img.yangkeduo.com/mms_static/72b7a16644e49b2983af08e2e3e2f59f.xml',
        addData: {
          sender: {
            address: {
              province: '上海市',
              city: '上海市',
              district: '长宁区',
              town: '虹桥街道',
              detail: '金虹桥国际中心',
            },
            name: '测试请求',
            mobile: '13012345678',
            phone: '057112345678',
          },
        },
        userid: '9853',
      },
      {
        data: {
          userdata: '商家自定义内容',
        },
        templateURL: 'https://www.titansaas.com/print_model/custom-template/pdd/custom-70-52-yd-0627.xml',
      },
      ],
    }],
  }, (data) => {
    console.log('print callback');
    setValue('printResult', JSON.stringify(data));
  });
});
