import { branch } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/common/type/roles';
import { Subjects } from '@casl/prisma';

export type Subject = Subjects<{
  branch: branch;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    can(Actions.create, 'branch');
    can(Actions.read, 'branch', { owner_id: user.id });
    can(Actions.update, 'branch', { owner_id: user.id });
    can(Actions.delete, 'branch', { owner_id: user.id });
  },
  employee({ user, can }) { 
    can(Actions.read, 'branch');
  },
};
