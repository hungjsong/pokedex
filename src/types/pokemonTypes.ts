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
  type: PokemonType;
  category: string;
  accuracy: number;
  powerPoint: number;
  power: number;
  additional_effect: {
    description: string;
    chance: number;
  };
};

export type Pokemon = {
  name: string | null;
  id: number | null;
  moves: Move[];
  item: string | null;
  level: number | null;
  gender: string | null;
  happiness: number | null;
  shiny: boolean | null;
  types: PokemonType[] | null;
  nature: string | null;
  iv: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
  };
  ev: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
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
