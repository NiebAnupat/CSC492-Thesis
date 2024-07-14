import { clinic } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/utils/type/roles';
import { Subjects } from '@casl/prisma';

export type Subject = Subjects<{
  clinic: clinic;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    can(Actions.read, 'clinic', { owner_id: user.id }).because(
      'User is the owner of the clinic',
    );
  },
};
