import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../club/club.entity';
import { Member } from '../member/member.entity';
import { ClubMemberDTO } from '../club-member/club-member.dto';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ClubMemberService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async associateClubMember(clubId: string, membertId: string): Promise<Club> {
    const member: Member = await this.memberRepository.findOne({
      where: { id: membertId },
    });

    if (!member)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const club: Club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    club.members = [...club.members, member];
    return await this.clubRepository.save(club);
  }

  async updateMemberFromClub(
    clubId: string,
    members: ClubMemberDTO[],
  ): Promise<Club[]> {
    const club: Club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });
    if (!club)
      throw new BusinessLogicException(
        'The Club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const updatedMembers: Club[] = [];

    for (const memberEntity of members) {
      const member: Member = await this.memberRepository.findOne({
        where: { id: memberEntity.id },
      });
      if (!member)
        throw new BusinessLogicException(
          'The member with the given id was not found',
          BusinessError.NOT_FOUND,
        );
      club.members = [...club.members, member];
      updatedMembers.push(await this.clubRepository.save(club));
    }

    return updatedMembers;
  }
  async getMemberClub(clubId: string, membertId: string): Promise<Member> {
    const member: Member = await this.memberRepository.findOne({
      where: { id: membertId },
    });

    if (!member)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const club: Club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return member;
  }

  async deleteMemberFromClub(clubId: string, membertId: string): Promise<Club> {
    const member: Member = await this.memberRepository.findOne({
      where: { id: membertId },
    });

    if (!member)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const club: Club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    club.members = club.members.filter((e) => e.id !== membertId);
    return await this.clubRepository.save(club);
  }

  async getClubMembers(clubId: string): Promise<Club> {
    const club: Club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return club;
  }
}
