import getTypeOfData from '../util/getTypeOfData';

export default class Websocket {
  constructor(url) {
    this.socket = null;
    this.isConnect = false;
    this.url = url;
  }

  register(doneCallback, messagesCallback) {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('message', (e) => {
      this.isConnect = true;
      if (messagesCallback) messagesCallback(e);
    });

    this.socket.addEventListener('open', () => {
      this.isConnect = true;
      if (doneCallback) doneCallback();
    });

    this.socket.addEventListener('error', () => {
      this.isConnect = false;
    });
  }

  send(data) {
    const type = getTypeOfData(data);

    if (type !== 'string') {
      try {
        const dataString = JSON.stringify(data || {});
        this.socket.send(dataString);
      } catch (e) {
        console.error('websocket send data can not parse to string', e);
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
