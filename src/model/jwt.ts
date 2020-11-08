
export interface IDecodeResult {
    payload: any;
}


export type IJWTDecode = (token: string, options?: any) =>null | IDecodeResult;
