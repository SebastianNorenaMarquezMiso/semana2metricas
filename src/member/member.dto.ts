import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class MemberDTO {
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly dateOfBirth: Date;
}
