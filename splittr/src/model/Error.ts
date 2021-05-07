export interface Error{
    code: ErrorCode;
    msg: string;
}

export enum ErrorCode{
    warning = 1,
    error = 2,
    info = 3
}