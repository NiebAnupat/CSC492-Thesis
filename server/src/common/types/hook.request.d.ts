import { AuthorizableRequest, AuthorizableUser } from 'nest-casl';
export type HookRequest = AuthorizableRequest<
  AuthorizableUser<string, string>,
  AnyObject
>;
