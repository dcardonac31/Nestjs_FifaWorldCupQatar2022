export class StandingResponseDto {
    _id:   string;
    group: string;
    teams: StandingTeam[];
}

export class StandingTeam {
    team_id: string;
    mp:      string;
    w:       string;
    l:       string;
    pts:     string;
    gf:      string;
    ga:      string;
    gd:      string;
    d:       string;
    name_fa: string;
    name_en: string;
    flag:    string;
}
