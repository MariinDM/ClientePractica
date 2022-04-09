export interface User {
    username:string;
    email:string;
    password:string;
    status:boolean;
    role_id:number;
}

export interface UserLogin {
    email:string;
    password:string;
}
