import { Subjects } from '@casl/prisma';
import { customer } from '@prisma/client';
import { Actions, Permissions } from 'nest-casl';
import { Role } from 'src/auth/common/type/roles';

export type Subject = Subjects<{
  customer: customer;
}>;

export const permissions: Permissions<Role, Subject, Actions> = {
  owner({ user, can }) {
    can(Actions.read, 'customer', { customer_id: user.id });
  },
};
