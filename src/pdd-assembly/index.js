import Websocket from '../Websocket';
import getUUID from '../util/getUUID';
import {
  PDD_ASSEMBLY_VERSION,
  GET_PRINTERS_COMMAND,
  GET_PRINTER_CONFIG_COMMAND,
  SET_PRINTER_CONFIG_COMMAND,
  PRINT_COMMAND,
  GET_TASK_STATUS_COMMAND,
  GET_GLOBAL_CONFIG_COMMAND,
  SET_GLOBAL_CONFIG_COMMAND,
  GET_PRINT_ASSEMBLY_VERSION,
} from '../util/constants';

export default class PddAssembly extends Websocket {
  constructor({ url = '', ISVName = '', ERPId = '' } = {}) {
    super(url);
    this.printerList = [];
    this.defaultPrinter = '';
    this.version = '0';
    this.ISVName = ISVName;
    this.ERPId = ERPId;
    this.versionCallback = undefined;
    this.getPrintConfigCallback = undefined;
    this.printCommitCallback = undefined;
    this.getTaskStatusCallback = undefined;
    this.getGlobalConfigCallback = undefined;
    this.setGlobalConfigCallback = undefined;
    this.init();
  }

  async init() {
    await this.register();
    this.receive(PddAssembly.messageParsing);
    this.getPrinters();
    this.getVersion();
  }

  getPrinters() {
    const request = PddAssembly.getBaseRequest(GET_PRINTERS_COMMAND);
    this.send(request);
  }

  getPrintConfig({ printer = this.defaultPrinter } = {}, callback) {
    const request = PddAssembly.getBaseRequest(GET_PRINTER_CONFIG_COMMAND);
    this.send({ ...request, printer });
    this.getPrintConfigCallback = callback;
  }

  setPrinterConfig({
    printer = this.defaultPrinter,
    isPrintTopLogo = false,
    isPrintBottomLogo = false,
    horizontalOffset = 0,
    verticalOffset = 0,
  } = {}) {
    const request = PddAssembly.getBaseRequest(SET_PRINTER_CONFIG_COMMAND);
    const printerConfig = {
      name: printer,
      PrintTopLogo: isPrintTopLogo,
      PrintBottomLogo: isPrintBottomLogo,
      horizontalOffset,
      verticalOffset,
    };
    this.send({ ...request, ...printerConfig });
  }

  printCommit({
    printer = this.defaultPrinter,
    documents = [],
    ISVName = this.ISVName,
    ERPId = this.ERPId,
    isPreview = false,
  } = {}, callback) {
    if (!documents.length) {
      console.error('Document is empty!');
      return;
    }

    const request = PddAssembly.getBaseRequest(PRINT_COMMAND);
    const extraConfig = {
      ISVName,
      ERPId,
      task: {
        taskID: getUUID(14),
        preview: isPreview,
        printer,
        documents,
      },
    };
    this.send({ ...request, ...extraConfig });
    this.printCommitCallback = callback;
  }

  getTaskStatus({ taskIdList = [] } = {}, callback) {
    const request = PddAssembly.getBaseRequest(GET_TASK_STATUS_COMMAND);
    this.send({ ...request, taskID: taskIdList });
    this.getTaskStatusCallback = callback;
  }

  getGlobalConfig(callback) {
    const request = PddAssembly.getBaseRequest(GET_GLOBAL_CONFIG_COMMAND);
    this.send(request);
    this.getGlobalConfigCallback = callback;
  }

  setGlobalConfig({ isFailedNotify = false } = {}, callback) {
    const request = PddAssembly.getBaseRequest(SET_GLOBAL_CONFIG_COMMAND);
    this.send({ ...request, TaskFailedNotify: isFailedNotify });
    this.setGlobalConfigCallback = callback;
  }

  getVersion(callback) {
    const request = PddAssembly.getBaseRequest(GET_PRINT_ASSEMBLY_VERSION);
    this.send(request);
    this.versionCallback = callback;
  }

  static getBaseRequest(cmd) {
    return {
      requestID: getUUID(),
      version: PDD_ASSEMBLY_VERSION,
      cmd,
    };
  }

  messageParsing({ data }) {
    const { cmd } = data;
    switch (cmd) {
      case GET_PRINTERS_COMMAND:
        this.printerList = data.printers;
        this.defaultPrinter = data.defaultPrinter;
        break;
      case GET_PRINTER_CONFIG_COMMAND:
        this.getPrintConfigCallback(data);
        this.getPrintConfigCallback = undefined;
        break;
      case PRINT_COMMAND:
        this.printCommitCallback(data);
        this.printCommitCallback = undefined;
        break;
      case GET_TASK_STATUS_COMMAND:
        this.getTaskStatusCallback(data);
        this.getTaskStatusCallback = undefined;
        break;
      case GET_GLOBAL_CONFIG_COMMAND:
        this.getGlobalConfigCallback(data);
        this.getGlobalConfigCallback = undefined;
        break;
      case SET_GLOBAL_CONFIG_COMMAND:
        this.setGlobalConfigCallback(data);
        this.setGlobalConfigCallback = undefined;
        break;
      case GET_PRINT_ASSEMBLY_VERSION:
        this.version = data.AppVersion;
        this.versionCallback(data);
        this.versionCallback = undefined;
        break;
      default:
        console.error('Unknown cmd');
    }
  }
}
