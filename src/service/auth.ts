import {IAuthInfo} from "../model/auth";
import {ILogin, IRegistration} from "../model/login";
import { IServiceResultWithPayload, IServiceResult } from "./service-result";
import extractSvcData from "./extract-svc-data";
import {ISession} from "../model/session";
import { ICommonService, CommonService } from "./common-service";
import {jwtDecode} from "../../platform-specific/jwtDecode";
import {REACT_APP_API_URL} from "../../platform-specific/config";
import {LocalStorage} from "./local-storage";
import {BowLog} from "../framework/bow-log";
import {ICancelContainer} from "../framework/transport";


export type IAuthInfoServiceResult = IServiceResultWithPayload<IAuthInfo>;

export interface IAuthService extends ICommonService {
   login(login: ILogin, cancelContainer: ICancelContainer): Promise<IServiceResult>;
   register(registration: IRegistration, cancelContainer: ICancelContainer): Promise<IServiceResult>;
   isLoggedIn(): boolean;
   getAuthName(): string;
   logout(): IServiceResult;
}

export class AuthService extends CommonService implements IAuthService {
    private readonly BASE_URL: string;
    constructor() {
        super();
        this.BASE_URL=REACT_APP_API_URL + "/auth";
    }

    public async login(login: ILogin, cancelContainer: ICancelContainer) {
        const myself = AuthService.getMyself("login");
        const url = this.BASE_URL+"/login";        
        BowLog.logobj(myself, `Authservice.login url=${url}`, login);
        try {
            const res = await this.postWithSession<IAuthInfoServiceResult>(url,{login}, cancelContainer);
            return this.processAuthResult(res);
        } catch(err) {
            return this.processLoginError(err);
        };
    }

    protected processLoginError(resp: any): IServiceResult {
        const myself = AuthService.getMyself("processLoginError");
        BowLog.logobj(myself, `resp=`, resp);
        let res: IServiceResult;
        if(resp && resp.response && resp.response.data) {
            console.log("extracting response from resp");
            res =  extractSvcData<IServiceResult>(resp.response);
            console.dir(res);            
        }
        throw res;
    }

    protected processAuthResult(authRes: IAuthInfoServiceResult) {
        const myself = AuthService.getMyself("processAuthResult");
        BowLog.logobj(myself, `authRes=`, authRes);

        if(authRes && authRes.result === "OK" && authRes.payload) {
            const token = authRes.payload.token;
            //window.localStorage.setItem("isLoggedIn","1");
            LocalStorage.set("isLoggedIn","1");
            let tokenData=token;
            if(token.startsWith("Bearer ")) {
                tokenData = token.substring(7);
            }
            BowLog.logobj(myself, `tokenData=`, tokenData);
            const decoded = jwtDecode(tokenData, {complete: true} );
            BowLog.logobj(myself, `1 decoded=`, decoded);
            if(decoded && decoded.payload) {
                BowLog.log2(myself, `proceed`);
                const auth = decoded.payload;
                const authName = auth.name;
                const sessionkey: string = auth.sessionkey;
                const session: ISession = {sessionkey};
                //window.localStorage.setItem("authName", authName);
                //window.localStorage.setItem("session", JSON.stringify(session));
                LocalStorage.set("authName", authName);
                LocalStorage.set("session", JSON.stringify(session));
            }
        }
        BowLog.log3(myself, `proceed`);
        const svcResult: IServiceResult = {
            result: authRes.result || "Error",
            errors: authRes.errors || {}
        };
        BowLog.logobj(myself, `svcResult=`, svcResult);
        return svcResult;
    }

    public isLoggedIn(): boolean {
        //return (window.localStorage.getItem("isLoggedIn") === "1" );
        return (LocalStorage.get("isLoggedIn") === "1" );
    }

    public getAuthName(): string {
        //return window.localStorage.getItem("authName") || "";
        return LocalStorage.get("authName") || "";
    }

    public logout() {
        /*
        window.localStorage.removeItem("authName");
        window.localStorage.removeItem("isLoggedIn");
        window.localStorage.removeItem("session");
        */
        LocalStorage.remove("authName");
        LocalStorage.remove("isLoggedIn");
        LocalStorage.remove("session");

        const res: IServiceResult = {result: "OK", errors: {} };
        return res;
    }

   

    public async register(registration: IRegistration, cancelContainer: ICancelContainer): Promise<IServiceResult> {
        const url = this.BASE_URL+"/register";
        const myself = AuthService.getMyself("register");
        BowLog.logobj(myself, `url=${url} registration=`, registration);

        try {
            const res = await this.postWithSession<IAuthInfoServiceResult>(url, {registration}, cancelContainer);
            return this.processAuthResult(res);
        } catch(err) {            
            return this.processRegistrationError(err);
        }
    }

    protected processRegistrationError(resp: any): IServiceResult {
        const myself = AuthService.getMyself("processRegistrationError");
        BowLog.logobj(myself, 'resp=', resp);

        let res: IServiceResult;
        if(resp && resp.response && resp.response.data) {
            console.log("extracting response from resp");
            res =  extractSvcData<IServiceResult>(resp.response);
            BowLog.logobj(myself, 'res=', res);
            throw(res);
        }
        throw(resp);
    }
    
    protected static getMyself(funcname: string) {
        return "AuthService";
    }
}
