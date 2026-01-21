interface ICertificate {
    CN: string;
    O: string;
    PINFL: string;
    T: string;
    TIN: string;
    UID: string;
    alias: string;
    disk: string;
    name: string;
    path: string;
    serialNumber: string;
    type: string;
    validFrom: Date;
    validTo: Date;
}

interface IChallenge {
    challenge: string;
    ttl: number;
    pkcs7b64: string;
    status: number;
    message: string;
}

interface ICert {
    id: string;
    cert: string
}

export type {
    ICertificate,
    IChallenge,
    ICert,
}