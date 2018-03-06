export interface IServerMessage {
    success: boolean;
    apistatus: 'passing' | 'failing'
    output: any;
}