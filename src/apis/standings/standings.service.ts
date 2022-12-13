import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios';
import { AppConfiguration } from "read-appsettings-json";
import { map, Observable } from 'rxjs';
import { Response } from 'src/common/dto/response';
import { StandingResponseDto, StandingTeam } from './dto/standing-response.dto';

@Injectable()
export class StandingsService {
    private readonly logger = new Logger('StandingsService');
    constructor(private httpService: HttpService) { }

    baseUrl = AppConfiguration.Setting().apiUrl;
    token = AppConfiguration.Setting().token;

    getStandings(): Observable<AxiosResponse<Response<StandingResponseDto[]>>> {
        try {
            const apiUrl = this.baseUrl + '/standings';
            const headersRequest = {
                'Authorization': 'Bearer ' + this.token
            }
            return this.httpService.get(apiUrl, {
                headers: headersRequest
            }).pipe(map(
                response => {
                    return response.data;
                }));
        } catch (error) {
            this.logger.error(error);
            const { data } = error.response;
            return data;
        }
    }

    getStandingsByGroup(group: string): Observable<AxiosResponse<Response<StandingResponseDto[]>>> {
        try {
            console.log(group);
            const apiUrl = this.baseUrl + '/standings/' + group;
            const headersRequest = {
                'Authorization': 'Bearer ' + this.token
            }
            return this.httpService.get(apiUrl, {
                headers: headersRequest
            }).pipe(map(
                response => {
                    response.data.data = this.orderStanding(response.data.data);
                    console.log(response.data.data);
                    return response.data;
                }));
        } catch (error) {
            this.logger.error(error);
            const { data } = error.response;
            return data;
        }
    }

    private orderStanding(standingResponse: StandingResponseDto): StandingResponseDto {       
        const standingTeamsOrder = standingResponse[0].teams.sort((teamA, teamB) =>
            +teamB.pts - +teamA.pts ||
            +teamB.gd - +teamA.gd);

        standingResponse[0].teams = standingTeamsOrder;

        return standingResponse;
    }
}
