import { Subjects } from '@casl/prisma';
import { clinic } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/common/type/roles';

export type Subject = Subjects<{
  clinic: clinic;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    can(Actions.create, 'clinic').because('User is the owner of the clinic');
    can(Actions.read, 'clinic', { owner_uid: user.id }).because(
      'User is the owner of the clinic',
    );
    can(Actions.update, 'clinic', { owner_uid: user.id }).because(
      'User is the owner of the clinic',
    );
    can(Actions.delete, 'clinic').because('User is the owner of the clinic');
  },
};
