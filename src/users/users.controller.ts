import {
  Headers,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Inject,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';

import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth.guard';

import { Logger as WinstonLogger } from 'winston';
import {
  WINSTON_MODULE_PROVIDER,
  WINSTON_MODULE_NEST_PROVIDER,
} from 'nest-winston';

@Controller('users')
// @UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger2: LoggerService,
    @Inject(Logger) private readonly logger3: LoggerService,
  ) {}

  // @UseFilters(HttpExceptionFilter)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    this.printWinstonLog(dto);
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
    console.log(dto);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }

  private printWinstonLog(dto) {
    this.logger2.error('error: ', dto);
    this.logger2.warn('warn: ', dto);
    this.logger2.log('log: ', JSON.stringify(dto));
    // this.logger.info('info: ', dto);
    // this.logger.http('http: ', dto);
    this.logger2.verbose('verbose: ', dto);
    this.logger2.debug('debug: ', dto);
    // this.logger.silly('silly: ', dto);
  }
}
