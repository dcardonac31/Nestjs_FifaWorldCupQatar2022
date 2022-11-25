import { Module } from '@nestjs/common';
import { MatchesController } from './matches/matches.controller';
import { MatchesService } from './matches/matches.service';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';
import { StandingsController } from './standings/standings.controller';
import { StandingsService } from './standings/standings.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ApisModule],
  controllers: [MatchesController, TeamsController, StandingsController],
  providers: [MatchesService, TeamsService, StandingsService]
})
export class ApisModule {}
