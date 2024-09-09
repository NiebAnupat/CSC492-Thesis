import { Subjects } from '@casl/prisma';
import { branch } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/common/type/roles';

export type Subject = Subjects<{
  branch: branch;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    can(Actions.create, 'branch');
    can(Actions.read, 'branch', { owner_uid: user.id });
    can(Actions.update, 'branch', { owner_uid: user.id });
    can(Actions.delete, 'branch', { owner_uid: user.id });
  },
  employee({ user, can }) {
    can(Actions.read, 'branch', { owner_uid: user['owner_uid'] });
  },
};
