import { branch } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/utils/type/roles';
import { Subjects } from '@casl/prisma';

export type Subject = Subjects<{
  branch: branch;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    can(Actions.create, 'branch').because('User is the owner of the clinic');
    can(Actions.read, 'branch', { owner_id: user.id }).because(
      'User is the owner of the clinic',
    );
    // can(Actions.update, 'clinic', { owner_id: user.id }).because(
    //   'User is the owner of the clinic',
    // );
    can(Actions.delete, 'branch', { owner_id: user.id }).because(
      'User is the owner of the clinic',
    );
  },
};
