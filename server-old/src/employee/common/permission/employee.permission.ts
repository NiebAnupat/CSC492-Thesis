import { Subjects } from '@casl/prisma';
import { employee } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/common/type/roles';

export type Subject = Subjects<{
  employee: employee;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    // TODO : Get owner_uid from hook (Later)
    can(Actions.manage, 'employee', { owner_uid: user.id }).because(
      'User is the owner of the employee',
    );
  },

  // TODO: Add permissions for employee (Later)
  employee({ user, can }) {
    // TODO : Update this permission (Later)
    // Now manage permission is for dev
    can(Actions.manage, 'employee',)
    can(Actions.read, 'employee', { employee_uid: user.id }).because(
      'User is the employee',
    );
  },
};
