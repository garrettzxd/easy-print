import getTypeOfData from '../util/getTypeOfData';

export default class Websocket {
  constructor(url) {
    this.socket = null;
    this.isConnect = false;
    this.url = url;
  }

  register() {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.addEventListener('open', (e) => {
        this.isConnect = true;
        resolve(e);
      });

      this.socket.addEventListener('error', (err) => {
        this.isConnect = false;
        reject(err);
      });
    });
  }

  receive(callback) {
    this.socket.addEventListener('message', (e) => {
      this.isConnect = true;
      if (callback) callback(e);
    });
  }

  send(data) {
    const type = getTypeOfData(data);

    if (type !== 'string') {
      try {
        const dataString = JSON.stringify(data);
        this.socket.send(dataString);
      } catch (e) {
        console.error('websocket send data can not parse to string');
      }
    } else {
      this.socket.send(data);
    }
  }

  close(code, reason) {
    try {
      this.socket.close(code, reason);
    } catch (e) {
      // do nothing
    }
  }
}
