import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { MemberDTO } from './member.dto';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async findAll(): Promise<MemberDTO[]> {
    return await this.memberRepository.find({
      loadRelationIds: true,
    });
  }

  async findOne(id: string): Promise<MemberDTO> {
    const Member = await this.memberRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!Member)
      throw new BusinessLogicException(
        'The Member with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    else return Member;
  }

  async create(memberDTO: MemberDTO): Promise<MemberDTO> {
    if (!memberDTO.email.includes('@')) {
      throw new BusinessLogicException(
        'The email must contain the "@" character',
        BusinessError.BAD_REQUEST,
      );
    }

    const member = new Member();
    member.name = memberDTO.name;
    member.email = memberDTO.email;
    member.dateOfBirth = memberDTO.dateOfBirth;
    return await this.memberRepository.save(member);
  }

  async update(id: string, memberDTO: MemberDTO): Promise<MemberDTO> {
    if (!memberDTO.email.includes('@')) {
      throw new BusinessLogicException(
        'The email must contain the "@" character',
        BusinessError.BAD_REQUEST,
      );
    }
    const member = await this.memberRepository.findOne({
      where: { id },
    });
    if (!member)
      throw new BusinessLogicException(
        'The Member with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    member.name = memberDTO.name;
    member.email = memberDTO.email;
    member.dateOfBirth = memberDTO.dateOfBirth;
    await this.memberRepository.save(member);
    return member;
  }

  async delete(id: string) {
    const member = await this.memberRepository.findOne({
      where: { id },
    });
    if (!member)
      throw new BusinessLogicException(
        'The Member with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    else return await this.memberRepository.remove(member);
  }
}
