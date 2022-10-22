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
import { ClubDTO } from './club.dto';
import { Club } from './club.entity';
import { ClubService } from './club.service';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  async getAllClubs() {
    return await this.clubService.findAll();
  }

  @Get(':ClubId')
  async getClubById(@Param('ClubId') ClubId: string) {
    return await this.clubService.findOne(ClubId);
  }

  @Post()
  @HttpCode(201)
  async createClub(@Body() clubDTO: ClubDTO) {
    const club: Club = plainToInstance(Club, clubDTO);
    return await this.clubService.create(club);
  }

  @Put(':clubId')
  async updateClubById(
    @Param('clubId') clubId: string,
    @Body() clubDTO: ClubDTO,
  ) {
    const club: Club = plainToInstance(Club, clubDTO);
    return await this.clubService.update(clubId, club);
  }

  @Delete(':clubId')
  @HttpCode(204)
  async deleteClub(@Param('clubId') clubId: string) {
    return await this.clubService.delete(clubId);
  }
}
