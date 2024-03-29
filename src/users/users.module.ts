import { Logger, Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './command/create-user.handler';
import { UserEventHandler } from 'src/event/user-event.handler';
import { GetUserInfoQueryHandler } from './query/get-user-info.handler';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    Logger,
    CreateUserHandler,
    UserEventHandler,
    GetUserInfoQueryHandler,
  ],
})
export class UsersModule {}
