export interface ServerMessage<T> {
    success: boolean;
    output: T;
    apistatus: 'passing' | 'failing';
}