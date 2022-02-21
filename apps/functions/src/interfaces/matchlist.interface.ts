export { MatchList, Match };

/**
 * Match list
 */
interface MatchList {
  season: string;
  matches: Match[];
}

interface Match {
  id: number;
  status: string;
  published: string;
  last_updated: string;
  league_name?: string;
  league_id?: string;
  competition_name?: string;
  competition_id?: string;
  competition_type?: string;
  match_type?: string;
  game_type?: string;
  season?: string;
  match_date: string;
  match_time: string;
  ground_name?: string;
  ground_id?: string;
  ground_latitude?: string;
  ground_longitude?: string;
  home_club_name?: string;
  home_team_name?: string;
  home_team_id?: string;
  home_club_id?: string;
  away_club_name?: string;
  away_team_name?: string;
  away_team_id?: string;
  away_club_id?: string;
  umpire_1_name?: string;
  umpire_1_id?: string;
  umpire_2_name?: string;
  umpire_2_id?: string;
  umpire_3_name?: string;
  umpire_3_id?: string;
  referee_name?: string;
  referee_id?: string;
  scorer_1_name?: string;
  scorer_1_id?: string;
  scorer_2_name?: string;
  scorer_2_id?: string;
  home_team_isNavestock?: boolean;
  navestock_club_name?: string;
  navestock_team_name?: string;
  navestock_team_id?: string;
  navestock_club_id?: string;
  opposition_club_name?: string;
  opposition_team_name?: string;
  opposition_team_id?: string;
  opposition_club_id?: string;
  toss_won_by_team_id?: string;
  toss?: string;
  batted_first?: string;
  no_of_overs?: string;
  result_updated?: boolean;
  result_description?: string;
  result_applied_to?: string;
  match_notes?: string;
}
