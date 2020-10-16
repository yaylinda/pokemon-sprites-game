import { orderBy } from "lodash"
import PokemonRawData from "./PokemonDataRaw";

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
};

const PokemonByTotalAsc: PokemonData[] = orderBy(PokemonRawData, ['total'], ['asc']);

export const getPokemonByStrengthAndType = (strength: number, maxStrength: number, type: PokemonType): PokemonData => {
  const index = Math.floor((strength / maxStrength) * PokemonByTotalAsc.length) + 1;

  console.log(`[Pokemon][getPokemonByStrengthAndType][strength=${strength}][maxStrength=${maxStrength}][type=${type}] - index: ${index}`);

  console.log(`total pokemon: ${PokemonByTotalAsc.length}`);

  let offset: number = 0;
  let pokemonAtIndexHigh: PokemonData = PokemonByTotalAsc[index];
  let pokemonAtIndexLow: PokemonData = PokemonByTotalAsc[index];
  let chosenPokemon: PokemonData = PokemonByTotalAsc[index];

  while (true) {
    const indexHigh = index + offset;
    const indexLow = index - offset;

    let foundHigh = false;
    let foundLow = false;

    console.log(`indexHigh: ${indexHigh}`);
    console.log(`indexLow: ${indexLow}`);
    if (indexHigh < PokemonByTotalAsc.length - 1){
      pokemonAtIndexHigh = PokemonByTotalAsc[indexHigh]
      console.log(`[Pokemon][getPokemonByStrengthAndType][HIGH]
    pokemon: ${JSON.stringify(chosenPokemon)}
  `);

      if (pokemonAtIndexHigh.type_1 === type || pokemonAtIndexHigh.type_2 === type) {
        foundHigh = true;
      }
    }

    if (indexLow >= 0 && indexLow < PokemonByTotalAsc.length - 1) { 
      pokemonAtIndexLow = PokemonByTotalAsc[indexLow]
      console.log(`[Pokemon][getPokemonByStrengthAndType][LOW]
    pokemon: ${JSON.stringify(chosenPokemon)}
  `);
      if (pokemonAtIndexLow.type_1 === type || pokemonAtIndexLow.type_2 === type) {
        foundLow = true;
      }
    }

    if (foundHigh || foundLow) {
      chosenPokemon = foundHigh ? pokemonAtIndexHigh : pokemonAtIndexLow;
      break;
    }

    offset += 1;
  }



  return chosenPokemon;
}

export default PokemonByTotalAsc;
