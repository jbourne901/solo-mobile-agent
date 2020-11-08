import axios, { CancelTokenSource } from "axios";
import extractSvcData from "../service/extract-svc-data";
import { ISession } from "../model/session";

export type ICancelControl = CancelTokenSource;
export interface ICancelContainer {
    cancelControl?: ICancelControl;
}

class Transport {
    public static async post<T>(url: string, params: any, cancelContainer: ICancelContainer) {
        cancelContainer.cancelControl = axios.CancelToken.source();
        try {
            const res = await axios.post<T>(url, params, {cancelToken: cancelContainer.cancelControl.token})
            return extractSvcData<T>(res);    
        } catch(err) {
            console.log(`errror ${err}`);
            throw err;
        }
    }

    public static async postWithSession<T>(url: string, session: ISession, params: any, cancelContainer: ICancelContainer) {
        return Transport.post<T>(url, {session, ...params}, cancelContainer);
    }
}

export {Transport};
