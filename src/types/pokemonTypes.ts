export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonEntry = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  height: number;
  weight: number;
  stats: APIStats[];
};

type APIStats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type Move = {
  id: number;
  name: string;
  type: string;
  category: string;
  accuracy: number;
  powerPoint: number;
  power: number | null;
  effect_chance: number | null;
  effect_description: string | null;
};

export type Pokemon = {
  dbID?: number | string;
  name?: string;
  id: number;
  moves?: (Move | null)[];
  item?: Item;
  level?: number;
  gender?: string;
  happiness?: number;
  shiny?: boolean;
  types?: PokemonType[];
  nature: PokemonNature;
  baseStats?: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  };
  iv?: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  };
  ev?: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  };
  catchRate?: number;
  weight?: number;
};

export type Genus = {
  genus: string;
  language: {
    name: string;
    url: string;
  };
};

export type SpeciesDetails = {
  genera: Genus[];
};

export type PokemonNature = {
  name: string;
  increased_stat: string | null;
  decreased_stat: string | null;
};

export type Item = {
  id: number;
  name: string;
  description: string;
  spriteURL: string;
};

export type statType = 'hp' | 'atk' | 'def' | 'spAtk' | 'spDef' | 'spd';

export type PokeBall = {
  name: string;
  catchRateModifier: number;
};
