import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubMemberService } from './club-member.service';
import { ClubMemberController } from './club-member.controller';
import { Club } from '../club/club.entity';
import { Member } from '../member/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Member])],
  providers: [ClubMemberService],
  controllers: [ClubMemberController],
})
export class ClubMemberModule {}
