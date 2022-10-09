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
  };
  types: PokemonType[];
  height: number;
  weight: number;
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
