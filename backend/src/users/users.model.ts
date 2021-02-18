import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum Roles {
  Admin = 'Admin',
  Basic = 'Basic',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Admin create projects & tasks, Basic create tasks',
});

@ObjectType()
export default class User {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  imageURL?: string;

  @Field((type) => Roles)
  role?: Roles;
}

@InputType()
export class InputUser extends User {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field({ defaultValue: Roles.Admin })
  role: Roles;
}
