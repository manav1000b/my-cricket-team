export interface Player {
  name: string;
  roles: Array<Role>;
  selected: boolean;
  captain: boolean;
}

export type Role = 'Batsman' | 'Bowler' | 'WicketKeeper';

export interface Team {
  players: Player[];
}
