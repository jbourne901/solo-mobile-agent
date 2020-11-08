import {Transport, ICancelContainer} from "../framework/transport";
import {LocalStorage} from "./local-storage";
import {NoSession} from "../model/session";
import {Loggable} from "../framework/loggable";

export interface ICommonService {
    post<T>(url: string, params: any, cancelContainer: ICancelContainer): Promise<T>;
    postWithSession<T>(url: string, params: any, cancelContainer: ICancelContainer): Promise<T>;
}

export class CommonService extends Loggable implements ICommonService {
    public post<T>(url: string, params: any, cancelContainer: ICancelContainer): Promise<T> {
        console.log("post url=" + url);

        return Transport.post<T>(url, params, cancelContainer);
    }

    public session() {
        console.log("CommonService.session()");
        //const sessionstr = window.localStorage["session"];
        const sessionstr = LocalStorage.get("session");
        let session = NoSession;
        if(sessionstr && sessionstr.length>0) {
            session = JSON.parse(sessionstr);
        }
        return session;
    }


    public postWithSession<T>(url: string, params: any, cancelContainer: ICancelContainer): Promise<T> {
        console.log("CommonService.postWithSession url="+url);
        const session = this.session();
        console.log("post url=" + url + " session=");
        console.dir(session);

        return Transport.postWithSession<T>(url, session, params, cancelContainer);
    }


}
