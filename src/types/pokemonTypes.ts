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

//TODO: Rename this, I think?
export type EVType = 'hp' | 'atk' | 'def' | 'spAtk' | 'spDef' | 'spd';
//export type EVTypeDynamic = keyof NonNullable<Pokemon['ev']>;

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
  nature?: string;
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
