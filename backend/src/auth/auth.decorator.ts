import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const { userId, email } = GqlExecutionContext.create(
      context,
    ).getContext().req.user;
    return {
      _id: userId,
      email,
    };
  },
);
