import { JwtUser } from "src/auth/common/type/auth";
import { HookRequest } from "../types/hook.request";

export interface CASLHook { 
    methodGet(request: HookRequest, user: JwtUser): Promise<any>;
    methodPatchOrDelete(request: HookRequest): Promise<any>;
}