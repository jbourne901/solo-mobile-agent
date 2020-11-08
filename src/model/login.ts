export interface ILogin {
    username: string;
    password: string;
};

export const LoginDefault: ILogin = {
    username: "",
    password: ""
};

export interface IRegistration {
    username: string;
    password: string;
    confirmPassword: string;
}
