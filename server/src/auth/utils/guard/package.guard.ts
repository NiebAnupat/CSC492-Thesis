import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { $Enums } from "@prisma/client";
import { PACKAGE_KEY } from "../decorator/package.decorator";

export class PackageGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const packages = this.reflector.getAllAndOverride<$Enums.packages[]>(PACKAGE_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!packages) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.role === $Enums.roles.developer) return true;

    return this.matchPackage(packages, user);

  }

  matchPackage(packages: $Enums.packages[], user: any): boolean {
    return packages.includes(user.package);
  }
}
