import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
// import { BadRequestException } from '@nestjs/common';
import { NotIn } from 'src/utils/decorators/not-in';
import { BadRequestException } from '@nestjs/common';

export class CreateUserDto {
  @Transform((params) => {
    return params.value.trim();
  })
  @NotIn('password', {
    message: 'password는 name과 같은 문자열을 포함할 수 없습니다.',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  @Transform(({ value, obj }) => {
    if (obj.password.includes(obj.name.trim())) {
      throw new BadRequestException(
        'password는 name과 같은 문자열을 포함할 수 없습니다.',
      );
    }
    return value.trim();
  })
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
