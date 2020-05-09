export interface BaseResult {
  cmd: string;
  requestID?: string;
  status?: 'success' | 'failed';
  msg?: string;
}

interface BasePrintStatus {
  documentID: string;
  status: 'success' | 'failed' | 'canceled';
  msg: string;
}

/** get printer config websocket response */
export interface GetPrinterConfigResult extends BaseResult{
  printer: {
    name: string;
    PrintTopLogo: boolean;
    PrintBottomLogo: boolean;
    horizontalOffset: number;
    verticalOffset: number;
  }
}

/** set printer config websocket response */
export interface SetPrinterConfigResult extends BaseResult{}

/** print commit websocket response */
interface PrintStatus extends BasePrintStatus{
  detail: string;
}
export interface PrintResultNotify extends BaseResult{
  printer: string;
  taskID: string;
  taskStatus: 'printed' | 'failed';
  printStatus: PrintStatus[];
}

/** get print task status (print task has commit to assembly) websocket response */
interface DetailStatus extends BasePrintStatus{
  printer: string;
}
interface GetTaskResultPrintStatus {
  taskID: string;
  detailStatus: DetailStatus[];
}
export interface GetTaskStatusResult extends BaseResult{
  printStatus: GetTaskResultPrintStatus[];
}

/** get print assembly global config response */
export interface GetAssemblyGlobalConfigResult extends BaseResult{
  TaskFailedNotify: boolean;
}

/** set print assembly global config response */
export interface SetAssemblyGlobalConfigResult extends BaseResult{}

/** assembly version response */
export interface GetAssemblyVersionResult extends BaseResult{
  AppVersion: string;
}
