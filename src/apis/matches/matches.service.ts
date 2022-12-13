import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios';
import { AppConfiguration } from "read-appsettings-json";
import { map, Observable } from 'rxjs';
import { Response } from 'src/common/dto/response';
import { MatchResponseDto } from './dto/match-response.dto';
import { MatchRequestDateDto } from './dto/match-request-date.dto';

@Injectable()
export class MatchesService {
    private readonly logger = new Logger('MatchesService');
    constructor(private httpService: HttpService) {}

    baseUrl = AppConfiguration.Setting().apiUrl;
    token = AppConfiguration.Setting().token;

    getMatches(): Observable<AxiosResponse<Response<MatchResponseDto>>> {
        try {
            const apiUrl = this.baseUrl + '/match';
            const headersRequest = {
                'Authorization': 'Bearer ' + this.token
            }
            return this.httpService.get(apiUrl,{
                headers: headersRequest
            }).pipe(map(
                response => {
                response.data.data = this.orderMatch(response.data.data);
                console.log(response.data.data);
                return response.data;
            }));
        } catch (error) {
            this.logger.error(error);
            const { data } = error.response;
            return data;
        }
    }

    getMatchesByDate(dateParam: Date): Observable<AxiosResponse<Response<MatchResponseDto>>> {
        try {           
            const apiUrl = this.baseUrl + '/bydate';
            const headersRequest = {
                'Authorization': 'Bearer ' + this.token
            };
            let dateToConvert = new Date(dateParam);  
            let dateString: string;
            dateString = (dateToConvert.getMonth()+1) + "/" + (dateToConvert.getDate()) + "/" + dateToConvert.getFullYear(); 
            let matchDate: MatchRequestDateDto = {
                date: dateString
            };
            return this.httpService.post(apiUrl,matchDate,{
                headers: headersRequest
            }).pipe(map(
                response => {
                response.data.data = this.orderMatch(response.data.data);               
                return response.data;
            }));
        } catch (error) {
            this.logger.error(error);
            const { data } = error.response;
            return data;
        }
    }

    private orderMatch(matchResponse: MatchResponseDto[]): MatchResponseDto[] {
        const modifiedMatchResponse = matchResponse
            .map(element => ({
                ...element,
                local_date_date: this.setLocaleDate(element.local_date)
            }));
            
            const matchArrayOrderAsc = modifiedMatchResponse.sort(
                (objA, objB) => objA.local_date_date.getTime() - objB.local_date_date.getTime()
            );

            return modifiedMatchResponse;
    }

    private setLocaleDate(date: string) : Date {       
        let stringDateTime = date.split(' ');
        let stringDate = stringDateTime[0].split('/');
        let stringTime = stringDateTime[1].split(':');
        let month = stringDate[0];
        let day = stringDate[1];
        let year = stringDate[2];
        let hour = stringTime[0];
        let minute = stringTime[1];
        let stringDateFormat = year + "-" + month + "-" + day + " " + hour + ":" + minute       
        let local_date_date = new Date(stringDateFormat);
        return local_date_date;    
    }
}
