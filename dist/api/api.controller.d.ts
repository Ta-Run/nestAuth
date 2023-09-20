/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ApiService } from './api.service';
import { SignUpPayload } from './payload/signup.payload';
import { LoginPayload } from './payload/login.payload';
import { Response, Request } from 'express';
export declare class ApiController {
    private apiService;
    constructor(apiService: ApiService);
    signup(signupPayload: SignUpPayload): Promise<{
        token: string;
    }>;
    login(loginPayload: LoginPayload, response: Response): Promise<{
        message: string;
    }>;
    profile(request: Request): Promise<import("mongoose").Document<unknown, {}, import("./schemas/api.schema").User> & import("./schemas/api.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    randomJoke(): Promise<any>;
}
