import JWT from 'expo-jwt';
import { IJWTDecode, IDecodeResult } from "../src/model/jwt";

const jwtDecode: IJWTDecode = async (token: string, options: any) => {
    console.log(`jwt  ${JWT} decode=${JWT.decode}`)
    const r:IDecodeResult = {
        payload: JWT.decode(token, "")
    };
    return r;
    //return jwt.decode(token, {complete: true})
};
export {jwtDecode};


