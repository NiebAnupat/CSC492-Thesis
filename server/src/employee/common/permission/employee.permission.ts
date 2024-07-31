import { employee } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/common/type/roles';
import { Subjects } from '@casl/prisma';

export type Subject = Subjects<{
  employee: employee;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    // TODO : Get owner_id from hook
    can(Actions.manage,'employee', { owner_id: user.id }).because(
      'User is the owner of the employee',
    );
  },

  // TODO: Add permissions for employee
  employee({ user, can }) {
    can(Actions.read, 'employee', { employee_uid: user.id }).because(
      'User is the employee',
    );
  },
};
