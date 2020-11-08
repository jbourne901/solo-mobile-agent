import {IAuthService, AuthService} from "./auth";
/*
import {ILocalizationService, LocalizationService} from "./localization";
import {INotificationService, NotificationService} from "./notification";
import {IEPageService, EPageService} from "./epage";
import {IMenuService, MenuService} from "./menu";
*/

class Service {
   private static readonly _auth: IAuthService = new AuthService();
   /*
    private static readonly _localization: ILocalizationService = new LocalizationService();
    private static readonly _notification: INotificationService = new NotificationService();
    private static readonly _epage: IEPageService = new EPageService();
    private static readonly _menu: IMenuService = new MenuService();
   

   public static localization(): ILocalizationService {
      return this._localization;
   }


   public static notification(): INotificationService {
      return this._notification;
   }

   public static epage(): IEPageService {
      return this._epage;
   }

   public static menu(): IMenuService {
      return this._menu;
   }
*/
   public static auth(): IAuthService {
      return this._auth;
   }

}

export {Service};