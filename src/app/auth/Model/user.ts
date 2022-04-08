export interface User {
    username:string;
    email:string;
    password:string;
    status:boolean;
}

export interface UserLogin {
    email:string;
    password:string;
}
