import PddEncryptionDocument from './types/pdd-document';
import {
  GetPrinterConfigResult,
  SetPrinterConfigResult,
  PrintResultNotify,
  GetTaskStatusResult,
  GetAssemblyGlobalConfigResult,
  SetAssemblyGlobalConfigResult,
  GetAssemblyVersionResult,
} from './types/pdd-assembly-result';

export interface BaseParameter {
  printer: string;
}

export interface GetPrinterConfig extends BaseParameter{}

export interface SetPrinterConfig extends BaseParameter{
  isPrintTopLogo?: boolean;
  isPrintBottomLogo?: boolean;
  horizontalOffset?: number;
  verticalOffset?: number;
  autoOrientation?: boolean;
  autoPageSize?: boolean;
  forceNoPageMargins?: boolean;
  paperSize?: {
    width: number;
    height: number;
  }
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
  constructor(parameter: PddAssemblyParameter);

  printerList: string[];

  defaultPrinter: string;

  version: string;

  ISVName: string;

  ERPId: string;

  getPrintConfig: (config: GetPrinterConfig, callback?: (response: GetPrinterConfigResult) => void) => void;

  setPrinterConfig: (config: SetPrinterConfig, callback?: (response: SetPrinterConfigResult) => void) => void;

  printCommit: (parameter: PrintCommitParameter, callback?: (response: PrintResultNotify) => void) => void;

  getTaskStatus: (parameter: GetTaskStatusParameter, callback?: (response: GetTaskStatusResult) => void) => void;

  getGlobalConfig: (callback: (response: GetAssemblyGlobalConfigResult) => void) => void;

  setGlobalConfig: (parameter: SetGlobalConfigParameter, callback?: (response: SetAssemblyGlobalConfigResult) => void) => void;

  getVersion: (callback: (response: GetAssemblyVersionResult) => void) => void;
}
