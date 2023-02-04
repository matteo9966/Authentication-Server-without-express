import { Middleware } from "./Middleware.types";

export type MethodMiddlewareType = Map<string,Middleware[]>

export interface IRequestMiddlewaresRecord {
    get:MethodMiddlewareType,
    post:MethodMiddlewareType,
    delete:MethodMiddlewareType,
    update:MethodMiddlewareType,
    options:MethodMiddlewareType,
    // '**':MethodMiddlewareType, // se arrivo alla fine senza nessun opzione disponibile
}