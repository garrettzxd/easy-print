/** Custom sender data (different sender in encrypted data) */
export interface PrintAddData {
  sender: {
    address: {
      province?: string;
      city?: string;
      district?: string;
      town?: string;
      detail?: string;
    },
    name?: string;
    mobile?: string;
    phone?: string;
  },
}

/** Print data in the upper half */
export interface PrintData {
  encryptedData: string;
  signature: string;
  ver: string;
  templateUrl: string;
  addData?: PrintAddData;
  userid?: string;
}

/** Custom area data (print data in the bottom half) */
export interface CustomizeData {
  data: {
    [key: string]: string;
  },
  templateURL: string;
}

export default interface PddEncryptionDocument {
  documentID: string;
  contents: [PrintData, CustomizeData];
}


