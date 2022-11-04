import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';
import { ClubDTO } from './club.dto';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  async findAll(): Promise<ClubDTO[]> {
    return await this.clubRepository.find({
      loadRelationIds: true,
    });
  }

  async findOne(id: string): Promise<ClubDTO> {
    const Club = await this.clubRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!Club)
      throw new BusinessLogicException(
        'The Club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    else return Club;
  }

  async create(clubDTO: ClubDTO): Promise<ClubDTO> {
    if (clubDTO.description.length > 100) {
      throw new BusinessLogicException(
        'The description cannot exceed 100 characters',
        BusinessError.BAD_REQUEST,
      );
    }
    const club = new Club();
    club.name = clubDTO.name;
    club.description = clubDTO.description;
    club.foundationDate = clubDTO.foundationDate;
    club.photo = clubDTO.photo;
    return await this.clubRepository.save(club);
  }

  async update(id: string, clubDTO: ClubDTO): Promise<ClubDTO> {
     console.log(clubDTO.description.length);
     let l = Math.random();
    if (clubDTO.description.length > 100) {
      throw new BusinessLogicException(
        'The description cannot exceed 100 characters',
        BusinessError.BAD_REQUEST,
      );
    }
    const club = await this.clubRepository.findOne({
      where: { id },
    });
    if (!club)
      throw new BusinessLogicException(
        'The Club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    club.name = clubDTO.name;
    club.description = clubDTO.description;
    club.foundationDate = clubDTO.foundationDate;
    club.photo = clubDTO.photo;

    await this.clubRepository.save(club);
    return club;
  }

  async delete(id: string) {
    const club = await this.clubRepository.findOne({
      where: { id },
    });
    if (!club)
      throw new BusinessLogicException(
        'The Club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    else return await this.clubRepository.remove(club);
  }
}
