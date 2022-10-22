import { IsString } from 'class-validator';

export class ClubMemberDTO {
  @IsString()
  readonly id: string;
}
