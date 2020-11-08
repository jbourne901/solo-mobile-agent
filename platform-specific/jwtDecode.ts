import jwt_decode from "jwt-decode";

import { IJWTDecode, IDecodeResult } from "../src/model/jwt";
import {BowLog} from "../src/framework/bow-log";

const jwtDecode: IJWTDecode = (token: string, options: any) => {
    const decoded = jwt_decode(token);
    BowLog.logobj("jwtDecode","1: name=${decoded.name} decoded=", decoded);
    console.log(`jwt  ${jwt_decode} `)
    const r:IDecodeResult = {
        payload: decoded
    };
    return r;
    //return jwt.decode(token, {complete: true})
};
export {jwtDecode};
