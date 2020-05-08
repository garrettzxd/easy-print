import Websocket from '../Websocket';

export default class CainiaoAssembly extends Websocket {
  constructor(url) {
    super(url);
    this.version = '';
  }

  getVersion() {
    this.version = '1.0';
  }
}
