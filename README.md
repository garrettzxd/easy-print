# easy\-print

## Install

```
npm i @titansaas/easy-print -S
```
## Quick Start

```javascript
import EasyPrint from '@titansaas/easy-print';

const { PddAssembly } = EasyPrint;

const pddAssembly = new PddAssembly({
    url: 'ws://localhost:5000',
});

// 注：这里初始化连接websocket需要时间，new后立刻发送消息到组件可能通讯失败（仍然在连接中）
pddAssembly.getVersion();

console.log(pddAssembly.version);
```
## Print API

```typescript
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
```
详细API参考代码示例

## Precautions

1. 先确保打印组件正常运行
1. 确保打印组件websocket连接完成
1. 打印任务确认打印数据结构正确

## FAQ

详细打印组件交互协议参考(暂时只支持拼多多打印组件)

- [拼多多云打印交互协议](https://open.pinduoduo.com/#/document?url=https%253A%252F%252Fmstatic.pinduoduo.com%252Fautopage%252F216_static_4%252Findex.html)


