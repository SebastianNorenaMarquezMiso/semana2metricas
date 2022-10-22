import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Member } from '../member/member.entity';
import { Club } from '../club/club.entity';
import { Repository } from 'typeorm';
import { ClubMemberService } from './club-member.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClubMemberDTO } from './club-member.dto';

describe('ClubMemberService', () => {
  let service: ClubMemberService;
  let repository: Repository<Member>;
  let clubRepository: Repository<Club>;
  let member: Member;
  let clubList: Club[];
  let clubMemberList: ClubMemberDTO[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubMemberService],
    }).compile();

    service = module.get<ClubMemberService>(ClubMemberService);
    repository = module.get<Repository<Member>>(getRepositoryToken(Member));
    clubRepository = module.get<Repository<Club>>(getRepositoryToken(Club));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    clubRepository.clear();
    clubList = [];
    clubMemberList = [];
    for (let i = 0; i < 2; i++) {
      const club = new Club();
      club.name = faker.word.adjective();
      club.description = 'New';
      club.foundationDate = faker.date.past();
      club.photo = faker.lorem.lines();
      club.members = [];
      await clubRepository.save(club);
      clubList.push(club);
      clubMemberList.push({
        id: club.id,
      } as ClubMemberDTO);
    }

    member = await repository.save({
      name: faker.word.adjective(),
      email: faker.internet.email(faker.name.lastName()),
      dateOfBirth: faker.date.past(),
      clubs: [],
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('associateClubMember should add an Club to a Member', async () => {
    const club: Club = clubList[0];
    const updatedClub = await service.associateClubMember(club.id, member.id);
    expect(updatedClub.members.length).toBe(1);
    expect(updatedClub).not.toBeNull();
    expect(updatedClub.members[0].name).toBe(member.name);
  });

  it('getClubMembers should return Members by Club', async () => {
    const club: Club = clubList[0];
    await service.associateClubMember(club.id, member.id);
    const storedClub: Club = await service.getClubMembers(club.id);
    expect(storedClub).not.toBeNull();
    expect(storedClub.members.length).toBe(1);
  });
  it('getClubMembers should throw an exception for an invalid Club', async () => {
    await expect(() => service.getClubMembers('0')).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });
  it('getMemberClub should throw an exception for an invalid Club', async () => {
    await expect(() =>
      service.getMemberClub('0', member.id),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });
  it('getMemberClub should throw an exception for an invalid Member', async () => {
    const club: Club = clubList[0];
    await expect(() =>
      service.getMemberClub(club.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });
});
