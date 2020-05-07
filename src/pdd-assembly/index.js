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
  SET_GLOBAL_CONFIG_COMMAND, GET_PRINT_ASSEMBLY_VERSION,
} from '../util/constants';

export default class PddAssembly extends Websocket {
  constructor(url) {
    super(url);
    this.printerList = [];
    this.defaultPrinter = '';
    this.version = '0';
    this.init();
  }

  async init() {
    await this.register();
    this.receive(PddAssembly.assemblyData);
  }

  getPrinters() {
    const request = PddAssembly.getBaseRequest(GET_PRINTERS_COMMAND);
    this.send(request);
  }

  getPrintConfig({ printer = this.defaultPrinter } = {}) {
    const request = PddAssembly.getBaseRequest(GET_PRINTER_CONFIG_COMMAND);
    this.send({ ...request, printer });
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
    ISVName = '',
    ERPId = '',
    isPreview = false,
  } = {}) {
    if (!documents.length) console.error('Document is empty!');

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
  }

  getTaskStatus({ taskIdList = [] } = {}) {
    const request = PddAssembly.getBaseRequest(GET_TASK_STATUS_COMMAND);
    this.send({ ...request, taskID: taskIdList });
  }

  getGlobalConfig() {
    const request = PddAssembly.getBaseRequest(GET_GLOBAL_CONFIG_COMMAND);
    this.send(request);
  }

  setGlobalConfig({ isFailedNotify = false } = {}) {
    const request = PddAssembly.getBaseRequest(SET_GLOBAL_CONFIG_COMMAND);
    this.send({ ...request, TaskFailedNotify: isFailedNotify });
  }

  getVersion() {
    const request = PddAssembly.getBaseRequest(GET_PRINT_ASSEMBLY_VERSION);
    this.send(request);
  }

  static getBaseRequest(cmd) {
    return {
      requestID: getUUID(),
      version: PDD_ASSEMBLY_VERSION,
      cmd,
    };
  }

  static assemblyData(data) {
    console.log(data);
  }
}
