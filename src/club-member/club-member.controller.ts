import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
import { ClubMemberService } from './club-member.service';
import { ClubMemberDTO } from '../club-member/club-member.dto';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubMemberController {
  constructor(private readonly clubMemberService: ClubMemberService) {}

  @Post(':clubId/members/:memberId')
  async addMemberToClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubMemberService.associateClubMember(clubId, memberId);
  }

  @Put(':clubId/members')
  async updateMembersFromClub(
    @Param('clubId') clubId: string,
    @Body() members: ClubMemberDTO[],
  ) {
    return await this.clubMemberService.updateMemberFromClub(clubId, members);
  }

  @Delete(':clubId/members/:memberId')
  async deleteMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubMemberService.deleteMemberFromClub(clubId, memberId);
  }

  @Get(':clubId/members')
  async findMembersFromClub(@Param('clubId') clubId: string) {
    return await this.clubMemberService.getClubMembers(clubId);
  }

  @Get(':clubId/members/:memberId')
  async findMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubMemberService.getMemberClub(clubId, memberId);
  }
}
