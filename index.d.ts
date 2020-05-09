import PddEncryptionDocument from './types/pdd-document';

export interface BaseParameter {
  printer: string;
}

export interface GetPrinterConfig extends BaseParameter{}

export interface SetPrinterConfig extends BaseParameter{
  isPrintTopLogo?: boolean;
  isPrintBottomLogo?: boolean;
  horizontalOffset?: number;
  verticalOffset?: number;
}

export interface PrintCommitParameter extends BaseParameter{
  documents: PddEncryptionDocument[];
  ISVName?: string;
  ERPId?: string;
  isPreview?: boolean;
}

export interface GetTaskStatusParameter {
  taskIdList: string[];
}

export interface SetGlobalConfigParameter {
  isFailedNotify?: boolean;
}

export interface PddAssemblyParameter {
  url: string;
  ISVName?: string;
  ERPId?: string;
}

/** PinDuoDuo print assembly class */
export declare class PddAssembly {
  printerList: string[];

  defaultPrinter: string;

  version: string;

  ISVName: string;

  ERPId: string;

  constructor(parameter: PddAssemblyParameter);

  getPrintConfig: (config: GetPrinterConfig) => void;

  setPrinterConfig: (config: SetPrinterConfig) => void;

  printCommit: (parameter: PrintCommitParameter) => void;

  getTaskStatus: (parameter: GetTaskStatusParameter) => void;

  getGlobalConfig: () => void;

  setGlobalConfig: (parameter: SetGlobalConfigParameter) => void;

  getVersion: () => void;
}
