import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { Club } from './club.entity';
import { ClubService } from './club.service';
import { ClubDTO } from './club.dto';

describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<Club>;
  let clubList: Club[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<Club>>(getRepositoryToken(Club));
    await seedDatabase();
  });
  const seedDatabase = async () => {
    repository.clear();
    clubList = [];
    for (let i = 0; i < 5; i++) {
      const club = new Club();
      club.name = faker.word.adjective();
      club.description = faker.lorem.lines();
      club.foundationDate = faker.date.past();
      club.photo = faker.lorem.lines();
      await repository.save(club);
      clubList.push(club);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll should return all clubs', async () => {
    const club: ClubDTO[] = await service.findAll();
    expect(club).not.toBeNull();
    expect(club).toHaveLength(clubList.length);
  });

  it('findOne should return a club by id', async () => {
    const storedClub: Club = clubList[0];
    const club: ClubDTO = await service.findOne(storedClub.id);
    expect(club).not.toBeNull();
    expect(club.name).toEqual(storedClub.name);
  });

  it('findOne should throw an exception for an invalid club', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The Club with the given id was not found',
    );
  });

  it('create should return a new club', async () => {
    const club: Club = {
      id: '',
      name: faker.word.adjective(),
      description: "New",
      foundationDate: faker.date.past(),
      photo: faker.lorem.lines(),
      members: [],
    };

    const newClub: ClubDTO = await service.create(club);
    expect(newClub).not.toBeNull();

    const storedClub: Club = await repository.findOne({
      where: { id: newClub.id },
    });
    expect(storedClub).not.toBeNull();
    expect(storedClub.name).toEqual(newClub.name);
  });


  it('update should modify a club', async () => {
    const club: Club = clubList[0];
    club.name = 'New name';
    const updatedClub: ClubDTO = await service.update(club.id, club);
    expect(updatedClub).not.toBeNull();
    const storedClub: Club = await repository.findOne({
      where: { id: club.id },
    });
    expect(storedClub).not.toBeNull();
    expect(storedClub.name).toEqual(club.name);
  });


  it('update should throw an exception for an  exceed 100 characters', async () => {
    let club: Club = clubList[0];
    club = {
      ...club,
      name: 'New name',
      foundationDate: faker.date.future(),
    };
    club.description ="sadasdasdasdasdasdasdasdasdasjdgasjfgsdfgsdhjgfsjhadgfjsdahgfjsadgfjshdgafjsahgdfjsagdfjhasgfdjasfhgasjdhfgsjahdgfjsahdfgsjadhfgsajhdfgajsdhgfjsahgdfjsahdgfjhasgdfjhsgdafjhgsadjfhsagjfhgjhsagfjhgsajhdfgasjdhfgjsahdfjsad";
    const l = service.update(club.id, club) ;
    console.log(l);
    await expect(() => l).rejects.toHaveProperty(
      'message',
      'The description cannot exceed 100 characters',
    );
  });

  it('delete should remove a club', async () => {
    const club: Club = clubList[0];
    await service.delete(club.id);
    const deleteClub: Club = await repository.findOne({
      where: { id: club.id },
    });
    expect(deleteClub).toBeNull();
  });

  it('delete should throw an exception for an invalid club', async () => {
    const club: Club = clubList[0];
    await service.delete(club.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The Club with the given id was not found',
    );
  });
});
