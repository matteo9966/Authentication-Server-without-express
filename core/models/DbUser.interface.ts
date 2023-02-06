
export interface DbUser {
    id:string;
    email:string;
    passwordDigest:string,
    roles: string[],
    username:string,
}