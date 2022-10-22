import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubModule } from './club/club.module';
import { Member } from './member/member.entity';
import { MemberModule } from './member/member.module';
import { ClubMemberModule } from './club-member/club-member.module';
import { Club } from './club/club.entity';

@Module({
  imports: [
    ClubModule,
    MemberModule,
    ClubMemberModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Club, Member],
      dropSchema: false,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
