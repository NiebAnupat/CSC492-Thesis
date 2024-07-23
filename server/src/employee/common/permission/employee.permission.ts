import { employee } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/common/type/roles';
import { Subjects } from '@casl/prisma';

export type Subject = Subjects<{
  employee: employee;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    can(Actions.create, 'employee').because(
      'User is the owner of the employee',
    );
    can(Actions.read, 'employee', { owner_id: user.id }).because(
      'User is the owner of the employee',
    );
    can(Actions.update, 'employee', { owner_id: user.id }).because(
      'User is the owner of the employee',
    );
    can(Actions.delete, 'employee').because(
      'User is the owner of the employee',
    );
  },
};
