declare module '@modules/authentication/signature/Eimzo.js' {
    import {ICert, ICertificate} from "@app/interfaces";
    export default class {
        constructor()

        install: () => Promise<void>
        loadKey: (cert: ICertificate) => Promise<ICert>
        listAllUserKeys: () => Promise<ICertificate[]>
        createPkcs7: (id: string, content: string) => Promise<string>
        signPkcs7: (cert: ICert, content: string) => Promise<string>
        getCertificateChain: (loadKeyId: string) => Promise<string[]>
        getCertInfo: (cert: string) => Promise<void>
        getMainCertificate: (loadKeyId: string) => Promise<string | null>
        getTimestampToken: (signature: string) => Promise<string>
        addApiKey: (domain: string, key: string) => void
    }
}