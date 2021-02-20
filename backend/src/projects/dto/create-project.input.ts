import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  title: string;

  @Field((type) => [String])
  tasks: string;

  @Field()
  creatorId: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
