import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { StandingsService } from './standings.service';

@Controller('standings')
export class StandingsController {
    private readonly logger = new Logger('Matches');
    constructor(private standingsService: StandingsService) {}

    @Get('getStandings')
    getMatches(@Res() res) {
        this.logger.warn('getStandings');
        this.standingsService.getStandings().subscribe({
            next: (response) => res.status(HttpStatus.OK).json(response),
            error: (e) => res.status(HttpStatus.BAD_REQUEST).json({ ...e.response})
        });
    }

    @Get('getStandings/:group')
    getMatchesByDate(@Param('group') group: string, @Res() res) {
        this.logger.warn('getStandingsByGroup');
        this.standingsService.getStandingsByGroup(group).subscribe({
            next: (response) => res.status(HttpStatus.OK).json(response),
            error: (e) => res.status(HttpStatus.BAD_REQUEST).json({ ...e.response})
        });
    }   
}
