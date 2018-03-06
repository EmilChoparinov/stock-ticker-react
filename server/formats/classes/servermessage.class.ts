import { IServerMessage } from "../interfaces/servermessage.interface";

export class ServerMessage implements IServerMessage {
    success: boolean;
    output: any;
    apistatus: 'passing' | 'failing';
    constructor(success: boolean, output: any, apistatus: 'passing' | 'failing' = 'passing') {
        this.success = success;
        this.output = output;
        this.apistatus = apistatus;
    }
}