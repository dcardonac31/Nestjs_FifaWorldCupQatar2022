export class MatchResponseDto {
    _id:          string;
    away_score:   number;
    away_scorers: string[];
    away_team_id: string;
    finished:     Finished;
    group:        string;
    home_score:   number;
    home_scorers: string[];
    home_team_id: string;
    id:           string;
    local_date:   string;
    local_date_date:   Date;
    matchday:     string;
    persian_date: string;
    stadium_id:   string;
    time_elapsed: TimeElapsed;
    type:         string;
    home_team_fa: string;
    away_team_fa: string;
    home_team_en: string;
    away_team_en: string;
    home_flag:    string;
    away_flag:    string;
}

export enum Finished {
    False = "FALSE",
    True = "TRUE",
}

export enum TimeElapsed {
    Finished = "finished",
    Notstarted = "notstarted",
}
