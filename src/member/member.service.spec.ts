import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MemberDTO } from './member.dto';

describe('MemberService', () => {
  let service: MemberService;
  let repository: Repository<Member>;
  let membertList: Member[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
    repository = module.get<Repository<Member>>(getRepositoryToken(Member));
    await seedDatabase();
  });
  const seedDatabase = async () => {
    repository.clear();
    membertList = [];
    for (let i = 0; i < 5; i++) {
      const member = new Member();
      member.name = faker.word.adjective();
      member.email = faker.internet.email(faker.name.lastName());
      member.dateOfBirth = faker.date.past();
      await repository.save(member);
      membertList.push(member);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll should return all members', async () => {
    const member: MemberDTO[] = await service.findAll();
    expect(member).not.toBeNull();
    expect(member).toHaveLength(membertList.length);
  });

  it('findOne should return a member by id', async () => {
    const storedMember: Member = membertList[0];
    const membert: MemberDTO = await service.findOne(storedMember.id);
    expect(membert).not.toBeNull();
    expect(membert.name).toEqual(storedMember.name);
  });

  it('findOne should throw an exception for an invalid member', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The Member with the given id was not found',
    );
  });

  it('create should return a new member', async () => {
    const member: Member = {
      id: '',
      name: faker.word.adjective(),
      email: faker.internet.email(faker.name.lastName()),
      dateOfBirth: faker.date.past(),
      clubs: [],
    };
    const newMember: MemberDTO = await service.create(member);
    expect(newMember).not.toBeNull();

    const storedMember: MemberDTO = await repository.findOne({
      where: { id: newMember.id },
    });
    expect(storedMember).not.toBeNull();
    expect(storedMember.name).toEqual(newMember.name);
  });

  it('create should throw an exception for an invalid email', async () => {
    const member: Member = {
      id: '',
      name: faker.word.adjective(),
      email: 'NO VALID',
      dateOfBirth: faker.date.past(),
      clubs: [],
    };
    await expect(() => service.create(member)).rejects.toHaveProperty(
      'message',
      'The email must contain the "@" character',
    );
  });

  it('update should modify a member', async () => {
    const member: Member = membertList[0];
    member.name = 'New name';
    const updatedMember: MemberDTO = await service.update(member.id, member);
    expect(updatedMember).not.toBeNull();
    const storedMember: Member = await repository.findOne({
      where: { id: member.id },
    });
    expect(storedMember).not.toBeNull();
    expect(storedMember.name).toEqual(member.name);
  });

  it('update should throw an exception for an invalid member', async () => {
    let member: Member = membertList[0];
    member = {
      ...member,
      name: 'New name',
    };
    await expect(() => service.update('0', member)).rejects.toHaveProperty(
      'message',
      'The Member with the given id was not found',
    );
  });

  it('update should throw an exception for an invalid email', async () => {
    let member: Member = membertList[0];
    member = {
      ...member,
      email: 'New name',
    };
    await expect(() =>
      service.update(member.id, member),
    ).rejects.toHaveProperty(
      'message',
      'The email must contain the "@" character',
    );
  });

  it('delete should remove a member', async () => {
    const member: Member = membertList[0];
    await service.delete(member.id);
    const deleteMember: MemberDTO = await repository.findOne({
      where: { id: member.id },
    });
    expect(deleteMember).toBeNull();
  });

  it('delete should throw an exception for an invalid member', async () => {
    const member: Member = membertList[0];
    await service.delete(member.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The Member with the given id was not found',
    );
  });
});
