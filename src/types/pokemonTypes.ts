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
};

export type Move = {
  name: string;
  type: string;
  category: string;
  accuracy: number;
  powerPoint: number;
  power: number | null;
  additional_effect: {
    description: string | null;
    chance: number | null;
  };
};

export type Pokemon = {
  name?: string;
  id?: number;
  moves?: Move[];
  item?: string;
  level?: number;
  gender?: string;
  happiness?: number;
  shiny?: boolean;
  types?: PokemonType[];
  nature?: PokemonNature;
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
  name: string;
  description: string;
};

export type statType = 'hp' | 'atk' | 'def' | 'spAtk' | 'spDef' | 'spd';

export type PokeBall = {
  name: string;
  catchRateModifier: number;
};
