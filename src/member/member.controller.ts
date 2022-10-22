import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
import { MemberDTO } from './member.dto';
import { Member } from './member.entity';
import { MemberService } from './member.service';

@Controller('members')
@UseInterceptors(BusinessErrorsInterceptor)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getAllMembers() {
    return await this.memberService.findAll();
  }

  @Get(':memberId')
  async getMemberById(@Param('memberId') memberId: string) {
    return await this.memberService.findOne(memberId);
  }

  @Post()
  @HttpCode(201)
  async createMember(@Body() memberDTO: MemberDTO) {
    const member: Member = plainToInstance(Member, memberDTO);
    return await this.memberService.create(member);
  }

  @Put(':memberId')
  async updateMemberById(
    @Param('memberId') MemberId: string,
    @Body() memberDTO: MemberDTO,
  ) {
    const member: Member = plainToInstance(Member, memberDTO);
    return await this.memberService.update(MemberId, member);
  }

  @Delete(':memberId')
  @HttpCode(204)
  async deleteMember(@Param(',emberId') memberId: string) {
    return await this.memberService.delete(memberId);
  }
}
