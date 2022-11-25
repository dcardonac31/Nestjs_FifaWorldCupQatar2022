import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
    private readonly logger = new Logger('Matches');
    constructor(private matchesService: MatchesService) {}

    @Get('getMatches')
    getMatches(@Res() res) {
        this.logger.warn('getMatches');
        this.matchesService.getMatches().subscribe({
            next: (response) => res.status(HttpStatus.OK).json(response),
            error: (e) => res.status(HttpStatus.BAD_REQUEST).json({ ...e.response})
        });
    }

    @Get('getMatchesByDate/:matchDate')
    getMatchesByDate(@Param('matchDate') dateParam: Date, @Res() res) {
        this.logger.warn('getMatchesByDate');
        this.matchesService.getMatchesByDate(dateParam).subscribe({
            next: (response) => res.status(HttpStatus.OK).json(response),
            error: (e) => res.status(HttpStatus.BAD_REQUEST).json({ ...e.response})
        });
    }   
}
