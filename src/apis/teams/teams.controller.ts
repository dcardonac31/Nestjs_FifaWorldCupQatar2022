import { Controller, Get, HttpStatus, Logger, Res } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
    private readonly logger = new Logger('Teams');
    constructor(private teamsService: TeamsService) {}

    @Get('getTeams')
    getMatches(@Res() res) {
        this.logger.warn('getTeams');
        this.teamsService.getTeams().subscribe({
            next: (response) => res.status(HttpStatus.OK).json(response),
            error: (e) => res.status(HttpStatus.BAD_REQUEST).json({ ...e.response})
        });
    }
}
