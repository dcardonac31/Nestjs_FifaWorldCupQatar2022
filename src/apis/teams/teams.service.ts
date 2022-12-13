import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios';
import { AppConfiguration } from "read-appsettings-json";
import { map, Observable } from 'rxjs';
import { Response } from 'src/common/dto/response';
import { TeamResponseDto } from './dto/team-response.dto';

@Injectable()
export class TeamsService {
    private readonly logger = new Logger('TeamsService');
    constructor(private httpService: HttpService) {}

    baseUrl = AppConfiguration.Setting().apiUrl;
    token = AppConfiguration.Setting().token;

    getTeams(): Observable<AxiosResponse<Response<TeamResponseDto>>> {
        try {
            const apiUrl = this.baseUrl + '/team';
            const headersRequest = {
                'Authorization': 'Bearer ' + this.token
            }
            return this.httpService.get(apiUrl,{
                headers: headersRequest
            }).pipe(map(
                response => {
                response.data.data = this.orderTeam(response.data.data);
                return response.data;
            }));
        } catch (error) {
            this.logger.error(error);
            const { data } = error.response;
            return data;
        }
    }

    private orderTeam(teamResponse: TeamResponseDto[]): TeamResponseDto[] {   
        const teamResponseOrderById = teamResponse.sort((objA, objB) => 
            +objA.id - +objB.id);
        return teamResponseOrderById;
    }
}
