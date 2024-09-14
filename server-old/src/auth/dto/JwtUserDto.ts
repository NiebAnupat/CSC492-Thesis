import { $Enums } from "@prisma/client";
import { IsString } from "nestjs-swagger-dto";
import { Role } from "../common/type/roles";

export class JwtUserDto { 

    @IsString()
    id: string;

    @IsString({optional: true})
    uid?: string;

    @IsString({optional: true})
    branch_uid?: string;

    @IsString({optional: true})
    email?: string;

    @IsString({optional: true})
    roles: Role[];
    
    @IsString({optional: true})
    package?: $Enums.packages;

    @IsString({optional: true})
    owner_uid?: string;
}