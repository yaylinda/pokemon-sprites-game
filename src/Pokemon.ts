import { orderBy } from "lodash"
import POKEMON_STARTERS from "./PokemonStarters";

export type PokemonType =
  "Grass" | "Poison" | "Water" | "Fire" | "Flying" | "Bug" |
  "Ice" | "Normal" | "Electric" | "Ground" | "Fairy" | "Dragon" |
  "Psychic" | "Rock" | "Fighting" | "Steel" | "Ghost";

export type PokemonData = {
  id: string,
  name: string,
  type_1: string,
  type_2: string,
  color: string,
  ability_1: string,
  ability_2: string,
  ability_hidden: string,
  generation: string,
  legendary: string,
  mega_evolution?: string,
  height: string,
  weight: string,
  hp: string,
  attack: string,
  defense: string
  special_attack: string,
  special_defense: string,
  speed: string,
  total: string,
  sprite_url: string,
  filename: string,
  evolves_into?: string,

  // Info used for game
  turns_on_board?: number,
};

export const getRandomStarterForType = (type: 'Grass' | 'Fire' | 'Water'): PokemonData => {
  const generation = Math.floor((Math.random() * 8) + 1);

  console.log(`[Pokemon][getRandomStarterForType]
    type=${type}
    generation=${generation}
  `);

  // Deep copy the pokemon
  const pokemon = JSON.parse(
    JSON.stringify(
      POKEMON_STARTERS.filter((pokemon) => 
        parseInt(pokemon.generation) === generation && 
          (pokemon.type_1 === type || pokemon.type_2 === type))[0]));

  pokemon.turns_on_board = 0;

  return pokemon;
}

export const getPokemonById = (id: string): PokemonData => {
  console.log(`[Pokemon][getPokemonById]
    id=${id}
  `);

  return POKEMON_STARTERS.filter((pokemon) => pokemon.id === id)[0];
};