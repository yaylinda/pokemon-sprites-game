export type PokemonType =
  "Grass" | "Poison" | "Water" | "Fire" | "Flying" | "Bug" |
  "Ice" | "Normal" | "Electric" | "Ground" | "Fairy" | "Dragon" |
  "Psychic" | "Rock" | "Fighting" | "Steel" | "Ghost";

export type PokemonData = {
  id: number,
  name: string,
  type: PokemonType[],
  evolvesFrom: null | number,
  base: PokemonBaseStats,
};

export type PokemonBaseStats = {
  "HP": number,
  "Attack": number,
  "Defense": number,
  "Sp. Attack": number,
  "Sp. Defense": number,
  "Speed": number,
};

const pokemon_array: PokemonData[] = [{
  "id": 1,
  "name": "Bulbasaur",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 45,
    "Attack": 49,
    "Defense": 49,
    "Sp. Attack": 65,
    "Sp. Defense": 65,
    "Speed": 45
  }
},
{
  "id": 2,
  "name": "Ivysaur",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": 1,
  "base": {
    "HP": 60,
    "Attack": 62,
    "Defense": 63,
    "Sp. Attack": 80,
    "Sp. Defense": 80,
    "Speed": 60
  }
},
{
  "id": 3,
  "name": "Venusaur",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": 2,
  "base": {
    "HP": 80,
    "Attack": 82,
    "Defense": 83,
    "Sp. Attack": 100,
    "Sp. Defense": 100,
    "Speed": 80
  }
},
{
  "id": 4,
  "name": "Charmander",
  "type": [
    "Fire"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 39,
    "Attack": 52,
    "Defense": 43,
    "Sp. Attack": 60,
    "Sp. Defense": 50,
    "Speed": 65
  }
},
{
  "id": 5,
  "name": "Charmeleon",
  "type": [
    "Fire"
  ],
  "evolvesFrom": 4,
  "base": {
    "HP": 58,
    "Attack": 64,
    "Defense": 58,
    "Sp. Attack": 80,
    "Sp. Defense": 65,
    "Speed": 80
  }
},
{
  "id": 6,
  "name": "Charizard",
  "type": [
    "Fire",
    "Flying"
  ],
  "evolvesFrom": 5,
  "base": {
    "HP": 78,
    "Attack": 84,
    "Defense": 78,
    "Sp. Attack": 109,
    "Sp. Defense": 85,
    "Speed": 100
  }
},
{
  "id": 7,
  "name": "Squirtle",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 44,
    "Attack": 48,
    "Defense": 65,
    "Sp. Attack": 50,
    "Sp. Defense": 64,
    "Speed": 43
  }
},
{
  "id": 8,
  "name": "Wartortle",
  "type": [
    "Water"
  ],
  "evolvesFrom": 7,
  "base": {
    "HP": 59,
    "Attack": 63,
    "Defense": 80,
    "Sp. Attack": 65,
    "Sp. Defense": 80,
    "Speed": 58
  }
},
{
  "id": 9,
  "name": "Blastoise",
  "type": [
    "Water"
  ],
  "evolvesFrom": 8,
  "base": {
    "HP": 79,
    "Attack": 83,
    "Defense": 100,
    "Sp. Attack": 85,
    "Sp. Defense": 105,
    "Speed": 78
  }
},
{
  "id": 10,
  "name": "Caterpie",
  "type": [
    "Bug"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 45,
    "Attack": 30,
    "Defense": 35,
    "Sp. Attack": 20,
    "Sp. Defense": 20,
    "Speed": 45
  }
},
{
  "id": 11,
  "name": "Metapod",
  "type": [
    "Bug"
  ],
  "evolvesFrom": 10,
  "base": {
    "HP": 50,
    "Attack": 20,
    "Defense": 55,
    "Sp. Attack": 25,
    "Sp. Defense": 25,
    "Speed": 30
  }
},
{
  "id": 12,
  "name": "Butterfree",
  "type": [
    "Bug",
    "Flying"
  ],
  "evolvesFrom": 11,
  "base": {
    "HP": 60,
    "Attack": 45,
    "Defense": 50,
    "Sp. Attack": 90,
    "Sp. Defense": 80,
    "Speed": 70
  }
},
{
  "id": 13,
  "name": "Weedle",
  "type": [
    "Bug",
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 35,
    "Defense": 30,
    "Sp. Attack": 20,
    "Sp. Defense": 20,
    "Speed": 50
  }
},
{
  "id": 14,
  "name": "Kakuna",
  "type": [
    "Bug",
    "Poison"
  ],
  "evolvesFrom": 13,
  "base": {
    "HP": 45,
    "Attack": 25,
    "Defense": 50,
    "Sp. Attack": 25,
    "Sp. Defense": 25,
    "Speed": 35
  }
},
{
  "id": 15,
  "name": "Beedrill",
  "type": [
    "Bug",
    "Poison"
  ],
  "evolvesFrom": 14,
  "base": {
    "HP": 65,
    "Attack": 90,
    "Defense": 40,
    "Sp. Attack": 45,
    "Sp. Defense": 80,
    "Speed": 75
  }
},
{
  "id": 16,
  "name": "Pidgey",
  "type": [
    "Normal",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 45,
    "Defense": 40,
    "Sp. Attack": 35,
    "Sp. Defense": 35,
    "Speed": 56
  }
},
{
  "id": 17,
  "name": "Pidgeotto",
  "type": [
    "Normal",
    "Flying"
  ],
  "evolvesFrom": 16,
  "base": {
    "HP": 63,
    "Attack": 60,
    "Defense": 55,
    "Sp. Attack": 50,
    "Sp. Defense": 50,
    "Speed": 71
  }
},
{
  "id": 18,
  "name": "Pidgeot",
  "type": [
    "Normal",
    "Flying"
  ],
  "evolvesFrom": 17,
  "base": {
    "HP": 83,
    "Attack": 80,
    "Defense": 75,
    "Sp. Attack": 70,
    "Sp. Defense": 70,
    "Speed": 101
  }
},
{
  "id": 19,
  "name": "Rattata",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 30,
    "Attack": 56,
    "Defense": 35,
    "Sp. Attack": 25,
    "Sp. Defense": 35,
    "Speed": 72
  }
},
{
  "id": 20,
  "name": "Raticate",
  "type": [
    "Normal"
  ],
  "evolvesFrom": 19,
  "base": {
    "HP": 55,
    "Attack": 81,
    "Defense": 60,
    "Sp. Attack": 50,
    "Sp. Defense": 70,
    "Speed": 97
  }
},
{
  "id": 21,
  "name": "Spearow",
  "type": [
    "Normal",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 60,
    "Defense": 30,
    "Sp. Attack": 31,
    "Sp. Defense": 31,
    "Speed": 70
  }
},
{
  "id": 22,
  "name": "Fearow",
  "type": [
    "Normal",
    "Flying"
  ],
  "evolvesFrom": 21,
  "base": {
    "HP": 65,
    "Attack": 90,
    "Defense": 65,
    "Sp. Attack": 61,
    "Sp. Defense": 61,
    "Speed": 100
  }
},
{
  "id": 23,
  "name": "Ekans",
  "type": [
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 35,
    "Attack": 60,
    "Defense": 44,
    "Sp. Attack": 40,
    "Sp. Defense": 54,
    "Speed": 55
  }
},
{
  "id": 24,
  "name": "Arbok",
  "type": [
    "Poison"
  ],
  "evolvesFrom": 23,
  "base": {
    "HP": 60,
    "Attack": 95,
    "Defense": 69,
    "Sp. Attack": 65,
    "Sp. Defense": 79,
    "Speed": 80
  }
},
{
  "id": 25,
  "name": "Pikachu",
  "type": [
    "Electric"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 35,
    "Attack": 55,
    "Defense": 40,
    "Sp. Attack": 50,
    "Sp. Defense": 50,
    "Speed": 90
  }
},
{
  "id": 26,
  "name": "Raichu",
  "type": [
    "Electric"
  ],
  "evolvesFrom": 25,
  "base": {
    "HP": 60,
    "Attack": 90,
    "Defense": 55,
    "Sp. Attack": 90,
    "Sp. Defense": 80,
    "Speed": 110
  }
},
{
  "id": 27,
  "name": "Sandshrew",
  "type": [
    "Ground"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 50,
    "Attack": 75,
    "Defense": 85,
    "Sp. Attack": 20,
    "Sp. Defense": 30,
    "Speed": 40
  }
},
{
  "id": 28,
  "name": "Sandslash",
  "type": [
    "Ground"
  ],
  "evolvesFrom": 27,
  "base": {
    "HP": 75,
    "Attack": 100,
    "Defense": 110,
    "Sp. Attack": 45,
    "Sp. Defense": 55,
    "Speed": 65
  }
},
{
  "id": 29,
  "name": "Nidoran♀",
  "type": [
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 55,
    "Attack": 47,
    "Defense": 52,
    "Sp. Attack": 40,
    "Sp. Defense": 40,
    "Speed": 41
  }
},
{
  "id": 30,
  "name": "Nidorina",
  "type": [
    "Poison"
  ],
  "evolvesFrom": 29,
  "base": {
    "HP": 70,
    "Attack": 62,
    "Defense": 67,
    "Sp. Attack": 55,
    "Sp. Defense": 55,
    "Speed": 56
  }
},
{
  "id": 31,
  "name": "Nidoqueen",
  "type": [
    "Poison",
    "Ground"
  ],
  "evolvesFrom": 30,
  "base": {
    "HP": 90,
    "Attack": 92,
    "Defense": 87,
    "Sp. Attack": 75,
    "Sp. Defense": 85,
    "Speed": 76
  }
},
{
  "id": 32,
  "name": "Nidoran♂",
  "type": [
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 46,
    "Attack": 57,
    "Defense": 40,
    "Sp. Attack": 40,
    "Sp. Defense": 40,
    "Speed": 50
  }
},
{
  "id": 33,
  "name": "Nidorino",
  "type": [
    "Poison"
  ],
  "evolvesFrom": 32,
  "base": {
    "HP": 61,
    "Attack": 72,
    "Defense": 57,
    "Sp. Attack": 55,
    "Sp. Defense": 55,
    "Speed": 65
  }
},
{
  "id": 34,
  "name": "Nidoking",
  "type": [
    "Poison",
    "Ground"
  ],
  "evolvesFrom": 33,
  "base": {
    "HP": 81,
    "Attack": 102,
    "Defense": 77,
    "Sp. Attack": 85,
    "Sp. Defense": 75,
    "Speed": 85
  }
},
{
  "id": 35,
  "name": "Clefairy",
  "type": [
    "Fairy"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 70,
    "Attack": 45,
    "Defense": 48,
    "Sp. Attack": 60,
    "Sp. Defense": 65,
    "Speed": 35
  }
},
{
  "id": 36,
  "name": "Clefable",
  "type": [
    "Fairy"
  ],
  "evolvesFrom": 35,
  "base": {
    "HP": 95,
    "Attack": 70,
    "Defense": 73,
    "Sp. Attack": 95,
    "Sp. Defense": 90,
    "Speed": 60
  }
},
{
  "id": 37,
  "name": "Vulpix",
  "type": [
    "Fire"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 38,
    "Attack": 41,
    "Defense": 40,
    "Sp. Attack": 50,
    "Sp. Defense": 65,
    "Speed": 65
  }
},
{
  "id": 38,
  "name": "Ninetales",
  "type": [
    "Fire"
  ],
  "evolvesFrom": 37,
  "base": {
    "HP": 73,
    "Attack": 76,
    "Defense": 75,
    "Sp. Attack": 81,
    "Sp. Defense": 100,
    "Speed": 100
  }
},
{
  "id": 39,
  "name": "Jigglypuff",
  "type": [
    "Normal",
    "Fairy"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 115,
    "Attack": 45,
    "Defense": 20,
    "Sp. Attack": 45,
    "Sp. Defense": 25,
    "Speed": 20
  }
},
{
  "id": 40,
  "name": "Wigglytuff",
  "type": [
    "Normal",
    "Fairy"
  ],
  "evolvesFrom": 39,
  "base": {
    "HP": 140,
    "Attack": 70,
    "Defense": 45,
    "Sp. Attack": 85,
    "Sp. Defense": 50,
    "Speed": 45
  }
},
{
  "id": 41,
  "name": "Zubat",
  "type": [
    "Poison",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 45,
    "Defense": 35,
    "Sp. Attack": 30,
    "Sp. Defense": 40,
    "Speed": 55
  }
},
{
  "id": 42,
  "name": "Golbat",
  "type": [
    "Poison",
    "Flying"
  ],
  "evolvesFrom": 41,
  "base": {
    "HP": 75,
    "Attack": 80,
    "Defense": 70,
    "Sp. Attack": 65,
    "Sp. Defense": 75,
    "Speed": 90
  }
},
{
  "id": 43,
  "name": "Oddish",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 45,
    "Attack": 50,
    "Defense": 55,
    "Sp. Attack": 75,
    "Sp. Defense": 65,
    "Speed": 30
  }
},
{
  "id": 44,
  "name": "Gloom",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": 43,
  "base": {
    "HP": 60,
    "Attack": 65,
    "Defense": 70,
    "Sp. Attack": 85,
    "Sp. Defense": 75,
    "Speed": 40
  }
},
{
  "id": 45,
  "name": "Vileplume",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": 44,
  "base": {
    "HP": 75,
    "Attack": 80,
    "Defense": 85,
    "Sp. Attack": 110,
    "Sp. Defense": 90,
    "Speed": 50
  }
},
{
  "id": 46,
  "name": "Paras",
  "type": [
    "Bug",
    "Grass"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 35,
    "Attack": 70,
    "Defense": 55,
    "Sp. Attack": 45,
    "Sp. Defense": 55,
    "Speed": 25
  }
},
{
  "id": 47,
  "name": "Parasect",
  "type": [
    "Bug",
    "Grass"
  ],
  "evolvesFrom": 46,
  "base": {
    "HP": 60,
    "Attack": 95,
    "Defense": 80,
    "Sp. Attack": 60,
    "Sp. Defense": 80,
    "Speed": 30
  }
},
{
  "id": 48,
  "name": "Venonat",
  "type": [
    "Bug",
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 60,
    "Attack": 55,
    "Defense": 50,
    "Sp. Attack": 40,
    "Sp. Defense": 55,
    "Speed": 45
  }
},
{
  "id": 49,
  "name": "Venomoth",
  "type": [
    "Bug",
    "Poison"
  ],
  "evolvesFrom": 48,
  "base": {
    "HP": 70,
    "Attack": 65,
    "Defense": 60,
    "Sp. Attack": 90,
    "Sp. Defense": 75,
    "Speed": 90
  }
},
{
  "id": 50,
  "name": "Diglett",
  "type": [
    "Ground"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 10,
    "Attack": 55,
    "Defense": 25,
    "Sp. Attack": 35,
    "Sp. Defense": 45,
    "Speed": 95
  }
},
{
  "id": 51,
  "name": "Dugtrio",
  "type": [
    "Ground"
  ],
  "evolvesFrom": 50,
  "base": {
    "HP": 35,
    "Attack": 100,
    "Defense": 50,
    "Sp. Attack": 50,
    "Sp. Defense": 70,
    "Speed": 120
  }
},
{
  "id": 52,
  "name": "Meowth",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 45,
    "Defense": 35,
    "Sp. Attack": 40,
    "Sp. Defense": 40,
    "Speed": 90
  }
},
{
  "id": 53,
  "name": "Persian",
  "type": [
    "Normal"
  ],
  "evolvesFrom": 52,
  "base": {
    "HP": 65,
    "Attack": 70,
    "Defense": 60,
    "Sp. Attack": 65,
    "Sp. Defense": 65,
    "Speed": 115
  }
},
{
  "id": 54,
  "name": "Psyduck",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 50,
    "Attack": 52,
    "Defense": 48,
    "Sp. Attack": 65,
    "Sp. Defense": 50,
    "Speed": 55
  }
},
{
  "id": 55,
  "name": "Golduck",
  "type": [
    "Water"
  ],
  "evolvesFrom": 54,
  "base": {
    "HP": 80,
    "Attack": 82,
    "Defense": 78,
    "Sp. Attack": 95,
    "Sp. Defense": 80,
    "Speed": 85
  }
},
{
  "id": 56,
  "name": "Mankey",
  "type": [
    "Fighting"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 80,
    "Defense": 35,
    "Sp. Attack": 35,
    "Sp. Defense": 45,
    "Speed": 70
  }
},
{
  "id": 57,
  "name": "Primeape",
  "type": [
    "Fighting"
  ],
  "evolvesFrom": 56,
  "base": {
    "HP": 65,
    "Attack": 105,
    "Defense": 60,
    "Sp. Attack": 60,
    "Sp. Defense": 70,
    "Speed": 95
  }
},
{
  "id": 58,
  "name": "Growlithe",
  "type": [
    "Fire"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 55,
    "Attack": 70,
    "Defense": 45,
    "Sp. Attack": 70,
    "Sp. Defense": 50,
    "Speed": 60
  }
},
{
  "id": 59,
  "name": "Arcanine",
  "type": [
    "Fire"
  ],
  "evolvesFrom": 58,
  "base": {
    "HP": 90,
    "Attack": 110,
    "Defense": 80,
    "Sp. Attack": 100,
    "Sp. Defense": 80,
    "Speed": 95
  }
},
{
  "id": 60,
  "name": "Poliwag",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 50,
    "Defense": 40,
    "Sp. Attack": 40,
    "Sp. Defense": 40,
    "Speed": 90
  }
},
{
  "id": 61,
  "name": "Poliwhirl",
  "type": [
    "Water"
  ],
  "evolvesFrom": 60,
  "base": {
    "HP": 65,
    "Attack": 65,
    "Defense": 65,
    "Sp. Attack": 50,
    "Sp. Defense": 50,
    "Speed": 90
  }
},
{
  "id": 62,
  "name": "Poliwrath",
  "type": [
    "Water",
    "Fighting"
  ],
  "evolvesFrom": 61,
  "base": {
    "HP": 90,
    "Attack": 95,
    "Defense": 95,
    "Sp. Attack": 70,
    "Sp. Defense": 90,
    "Speed": 70
  }
},
{
  "id": 63,
  "name": "Abra",
  "type": [
    "Psychic"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 25,
    "Attack": 20,
    "Defense": 15,
    "Sp. Attack": 105,
    "Sp. Defense": 55,
    "Speed": 90
  }
},
{
  "id": 64,
  "name": "Kadabra",
  "type": [
    "Psychic"
  ],
  "evolvesFrom": 63,
  "base": {
    "HP": 40,
    "Attack": 35,
    "Defense": 30,
    "Sp. Attack": 120,
    "Sp. Defense": 70,
    "Speed": 105
  }
},
{
  "id": 65,
  "name": "Alakazam",
  "type": [
    "Psychic"
  ],
  "evolvesFrom": 64,
  "base": {
    "HP": 55,
    "Attack": 50,
    "Defense": 45,
    "Sp. Attack": 135,
    "Sp. Defense": 95,
    "Speed": 120
  }
},
{
  "id": 66,
  "name": "Machop",
  "type": [
    "Fighting"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 70,
    "Attack": 80,
    "Defense": 50,
    "Sp. Attack": 35,
    "Sp. Defense": 35,
    "Speed": 35
  }
},
{
  "id": 67,
  "name": "Machoke",
  "type": [
    "Fighting"
  ],
  "evolvesFrom": 66,
  "base": {
    "HP": 80,
    "Attack": 100,
    "Defense": 70,
    "Sp. Attack": 50,
    "Sp. Defense": 60,
    "Speed": 45
  }
},
{
  "id": 68,
  "name": "Machamp",
  "type": [
    "Fighting"
  ],
  "evolvesFrom": 67,
  "base": {
    "HP": 90,
    "Attack": 130,
    "Defense": 80,
    "Sp. Attack": 65,
    "Sp. Defense": 85,
    "Speed": 55
  }
},
{
  "id": 69,
  "name": "Bellsprout",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 50,
    "Attack": 75,
    "Defense": 35,
    "Sp. Attack": 70,
    "Sp. Defense": 30,
    "Speed": 40
  }
},
{
  "id": 70,
  "name": "Weepinbell",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": 69,
  "base": {
    "HP": 65,
    "Attack": 90,
    "Defense": 50,
    "Sp. Attack": 85,
    "Sp. Defense": 45,
    "Speed": 55
  }
},
{
  "id": 71,
  "name": "Victreebel",
  "type": [
    "Grass",
    "Poison"
  ],
  "evolvesFrom": 70,
  "base": {
    "HP": 80,
    "Attack": 105,
    "Defense": 65,
    "Sp. Attack": 100,
    "Sp. Defense": 70,
    "Speed": 70
  }
},
{
  "id": 72,
  "name": "Tentacool",
  "type": [
    "Water",
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 40,
    "Defense": 35,
    "Sp. Attack": 50,
    "Sp. Defense": 100,
    "Speed": 70
  }
},
{
  "id": 73,
  "name": "Tentacruel",
  "type": [
    "Water",
    "Poison"
  ],
  "evolvesFrom": 72,
  "base": {
    "HP": 80,
    "Attack": 70,
    "Defense": 65,
    "Sp. Attack": 80,
    "Sp. Defense": 120,
    "Speed": 100
  }
},
{
  "id": 74,
  "name": "Geodude",
  "type": [
    "Rock",
    "Ground"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 80,
    "Defense": 100,
    "Sp. Attack": 30,
    "Sp. Defense": 30,
    "Speed": 20
  }
},
{
  "id": 75,
  "name": "Graveler",
  "type": [
    "Rock",
    "Ground"
  ],
  "evolvesFrom": 74,
  "base": {
    "HP": 55,
    "Attack": 95,
    "Defense": 115,
    "Sp. Attack": 45,
    "Sp. Defense": 45,
    "Speed": 35
  }
},
{
  "id": 76,
  "name": "Golem",
  "type": [
    "Rock",
    "Ground"
  ],
  "evolvesFrom": 75,
  "base": {
    "HP": 80,
    "Attack": 120,
    "Defense": 130,
    "Sp. Attack": 55,
    "Sp. Defense": 65,
    "Speed": 45
  }
},
{
  "id": 77,
  "name": "Ponyta",
  "type": [
    "Fire"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 50,
    "Attack": 85,
    "Defense": 55,
    "Sp. Attack": 65,
    "Sp. Defense": 65,
    "Speed": 90
  }
},
{
  "id": 78,
  "name": "Rapidash",
  "type": [
    "Fire"
  ],
  "evolvesFrom": 77,
  "base": {
    "HP": 65,
    "Attack": 100,
    "Defense": 70,
    "Sp. Attack": 80,
    "Sp. Defense": 80,
    "Speed": 105
  }
},
{
  "id": 79,
  "name": "Slowpoke",
  "type": [
    "Water",
    "Psychic"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 90,
    "Attack": 65,
    "Defense": 65,
    "Sp. Attack": 40,
    "Sp. Defense": 40,
    "Speed": 15
  }
},
{
  "id": 80,
  "name": "Slowbro",
  "type": [
    "Water",
    "Psychic"
  ],
  "evolvesFrom": 79,
  "base": {
    "HP": 95,
    "Attack": 75,
    "Defense": 110,
    "Sp. Attack": 100,
    "Sp. Defense": 80,
    "Speed": 30
  }
},
{
  "id": 81,
  "name": "Magnemite",
  "type": [
    "Electric",
    "Steel"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 25,
    "Attack": 35,
    "Defense": 70,
    "Sp. Attack": 95,
    "Sp. Defense": 55,
    "Speed": 45
  }
},
{
  "id": 82,
  "name": "Magneton",
  "type": [
    "Electric",
    "Steel"
  ],
  "evolvesFrom": 81,
  "base": {
    "HP": 50,
    "Attack": 60,
    "Defense": 95,
    "Sp. Attack": 120,
    "Sp. Defense": 70,
    "Speed": 70
  }
},
{
  "id": 83,
  "name": "Farfetch'd",
  "type": [
    "Normal",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 52,
    "Attack": 90,
    "Defense": 55,
    "Sp. Attack": 58,
    "Sp. Defense": 62,
    "Speed": 60
  }
},
{
  "id": 84,
  "name": "Doduo",
  "type": [
    "Normal",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 35,
    "Attack": 85,
    "Defense": 45,
    "Sp. Attack": 35,
    "Sp. Defense": 35,
    "Speed": 75
  }
},
{
  "id": 85,
  "name": "Dodrio",
  "type": [
    "Normal",
    "Flying"
  ],
  "evolvesFrom": 84,
  "base": {
    "HP": 60,
    "Attack": 110,
    "Defense": 70,
    "Sp. Attack": 60,
    "Sp. Defense": 60,
    "Speed": 110
  }
},
{
  "id": 86,
  "name": "Seel",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 65,
    "Attack": 45,
    "Defense": 55,
    "Sp. Attack": 45,
    "Sp. Defense": 70,
    "Speed": 45
  }
},
{
  "id": 87,
  "name": "Dewgong",
  "type": [
    "Water",
    "Ice"
  ],
  "evolvesFrom": 86,
  "base": {
    "HP": 90,
    "Attack": 70,
    "Defense": 80,
    "Sp. Attack": 70,
    "Sp. Defense": 95,
    "Speed": 70
  }
},
{
  "id": 88,
  "name": "Grimer",
  "type": [
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 80,
    "Attack": 80,
    "Defense": 50,
    "Sp. Attack": 40,
    "Sp. Defense": 50,
    "Speed": 25
  }
},
{
  "id": 89,
  "name": "Muk",
  "type": [
    "Poison"
  ],
  "evolvesFrom": 88,
  "base": {
    "HP": 105,
    "Attack": 105,
    "Defense": 75,
    "Sp. Attack": 65,
    "Sp. Defense": 100,
    "Speed": 50
  }
},
{
  "id": 90,
  "name": "Shellder",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 30,
    "Attack": 65,
    "Defense": 100,
    "Sp. Attack": 45,
    "Sp. Defense": 25,
    "Speed": 40
  }
},
{
  "id": 91,
  "name": "Cloyster",
  "type": [
    "Water",
    "Ice"
  ],
  "evolvesFrom": 90,
  "base": {
    "HP": 50,
    "Attack": 95,
    "Defense": 180,
    "Sp. Attack": 85,
    "Sp. Defense": 45,
    "Speed": 70
  }
},
{
  "id": 92,
  "name": "Gastly",
  "type": [
    "Ghost",
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 30,
    "Attack": 35,
    "Defense": 30,
    "Sp. Attack": 100,
    "Sp. Defense": 35,
    "Speed": 80
  }
},
{
  "id": 93,
  "name": "Haunter",
  "type": [
    "Ghost",
    "Poison"
  ],
  "evolvesFrom": 92,
  "base": {
    "HP": 45,
    "Attack": 50,
    "Defense": 45,
    "Sp. Attack": 115,
    "Sp. Defense": 55,
    "Speed": 95
  }
},
{
  "id": 94,
  "name": "Gengar",
  "type": [
    "Ghost",
    "Poison"
  ],
  "evolvesFrom": 93,
  "base": {
    "HP": 60,
    "Attack": 65,
    "Defense": 60,
    "Sp. Attack": 130,
    "Sp. Defense": 75,
    "Speed": 110
  }
},
{
  "id": 95,
  "name": "Onix",
  "type": [
    "Rock",
    "Ground"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 35,
    "Attack": 45,
    "Defense": 160,
    "Sp. Attack": 30,
    "Sp. Defense": 45,
    "Speed": 70
  }
},
{
  "id": 96,
  "name": "Drowzee",
  "type": [
    "Psychic"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 60,
    "Attack": 48,
    "Defense": 45,
    "Sp. Attack": 43,
    "Sp. Defense": 90,
    "Speed": 42
  }
},
{
  "id": 97,
  "name": "Hypno",
  "type": [
    "Psychic"
  ],
  "evolvesFrom": 96,
  "base": {
    "HP": 85,
    "Attack": 73,
    "Defense": 70,
    "Sp. Attack": 73,
    "Sp. Defense": 115,
    "Speed": 67
  }
},
{
  "id": 98,
  "name": "Krabby",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 30,
    "Attack": 105,
    "Defense": 90,
    "Sp. Attack": 25,
    "Sp. Defense": 25,
    "Speed": 50
  }
},
{
  "id": 99,
  "name": "Kingler",
  "type": [
    "Water"
  ],
  "evolvesFrom": 98,
  "base": {
    "HP": 55,
    "Attack": 130,
    "Defense": 115,
    "Sp. Attack": 50,
    "Sp. Defense": 50,
    "Speed": 75
  }
},
{
  "id": 100,
  "name": "Voltorb",
  "type": [
    "Electric"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 30,
    "Defense": 50,
    "Sp. Attack": 55,
    "Sp. Defense": 55,
    "Speed": 100
  }
},
{
  "id": 101,
  "name": "Electrode",
  "type": [
    "Electric"
  ],
  "evolvesFrom": 100,
  "base": {
    "HP": 60,
    "Attack": 50,
    "Defense": 70,
    "Sp. Attack": 80,
    "Sp. Defense": 80,
    "Speed": 150
  }
},
{
  "id": 102,
  "name": "Exeggcute",
  "type": [
    "Grass",
    "Psychic"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 60,
    "Attack": 40,
    "Defense": 80,
    "Sp. Attack": 60,
    "Sp. Defense": 45,
    "Speed": 40
  }
},
{
  "id": 103,
  "name": "Exeggutor",
  "type": [
    "Grass",
    "Psychic"
  ],
  "evolvesFrom": 102,
  "base": {
    "HP": 95,
    "Attack": 95,
    "Defense": 85,
    "Sp. Attack": 125,
    "Sp. Defense": 75,
    "Speed": 55
  }
},
{
  "id": 104,
  "name": "Cubone",
  "type": [
    "Ground"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 50,
    "Attack": 50,
    "Defense": 95,
    "Sp. Attack": 40,
    "Sp. Defense": 50,
    "Speed": 35
  }
},
{
  "id": 105,
  "name": "Marowak",
  "type": [
    "Ground"
  ],
  "evolvesFrom": 104,
  "base": {
    "HP": 60,
    "Attack": 80,
    "Defense": 110,
    "Sp. Attack": 50,
    "Sp. Defense": 80,
    "Speed": 45
  }
},
{
  "id": 106,
  "name": "Hitmonlee",
  "type": [
    "Fighting"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 50,
    "Attack": 120,
    "Defense": 53,
    "Sp. Attack": 35,
    "Sp. Defense": 110,
    "Speed": 87
  }
},
{
  "id": 107,
  "name": "Hitmonchan",
  "type": [
    "Fighting"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 50,
    "Attack": 105,
    "Defense": 79,
    "Sp. Attack": 35,
    "Sp. Defense": 110,
    "Speed": 76
  }
},
{
  "id": 108,
  "name": "Lickitung",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 90,
    "Attack": 55,
    "Defense": 75,
    "Sp. Attack": 60,
    "Sp. Defense": 75,
    "Speed": 30
  }
},
{
  "id": 109,
  "name": "Koffing",
  "type": [
    "Poison"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 65,
    "Defense": 95,
    "Sp. Attack": 60,
    "Sp. Defense": 45,
    "Speed": 35
  }
},
{
  "id": 110,
  "name": "Weezing",
  "type": [
    "Poison"
  ],
  "evolvesFrom": 109,
  "base": {
    "HP": 65,
    "Attack": 90,
    "Defense": 120,
    "Sp. Attack": 85,
    "Sp. Defense": 70,
    "Speed": 60
  }
},
{
  "id": 111,
  "name": "Rhyhorn",
  "type": [
    "Ground",
    "Rock"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 80,
    "Attack": 85,
    "Defense": 95,
    "Sp. Attack": 30,
    "Sp. Defense": 30,
    "Speed": 25
  }
},
{
  "id": 112,
  "name": "Rhydon",
  "type": [
    "Ground",
    "Rock"
  ],
  "evolvesFrom": 111,
  "base": {
    "HP": 105,
    "Attack": 130,
    "Defense": 120,
    "Sp. Attack": 45,
    "Sp. Defense": 45,
    "Speed": 40
  }
},
{
  "id": 113,
  "name": "Chansey",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 250,
    "Attack": 5,
    "Defense": 5,
    "Sp. Attack": 35,
    "Sp. Defense": 105,
    "Speed": 50
  }
},
{
  "id": 114,
  "name": "Tangela",
  "type": [
    "Grass"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 65,
    "Attack": 55,
    "Defense": 115,
    "Sp. Attack": 100,
    "Sp. Defense": 40,
    "Speed": 60
  }
},
{
  "id": 115,
  "name": "Kangaskhan",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 105,
    "Attack": 95,
    "Defense": 80,
    "Sp. Attack": 40,
    "Sp. Defense": 80,
    "Speed": 90
  }
},
{
  "id": 116,
  "name": "Horsea",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 30,
    "Attack": 40,
    "Defense": 70,
    "Sp. Attack": 70,
    "Sp. Defense": 25,
    "Speed": 60
  }
},
{
  "id": 117,
  "name": "Seadra",
  "type": [
    "Water"
  ],
  "evolvesFrom": 116,
  "base": {
    "HP": 55,
    "Attack": 65,
    "Defense": 95,
    "Sp. Attack": 95,
    "Sp. Defense": 45,
    "Speed": 85
  }
},
{
  "id": 118,
  "name": "Goldeen",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 45,
    "Attack": 67,
    "Defense": 60,
    "Sp. Attack": 35,
    "Sp. Defense": 50,
    "Speed": 63
  }
},
{
  "id": 119,
  "name": "Seaking",
  "type": [
    "Water"
  ],
  "evolvesFrom": 118,
  "base": {
    "HP": 80,
    "Attack": 92,
    "Defense": 65,
    "Sp. Attack": 65,
    "Sp. Defense": 80,
    "Speed": 68
  }
},
{
  "id": 120,
  "name": "Staryu",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 30,
    "Attack": 45,
    "Defense": 55,
    "Sp. Attack": 70,
    "Sp. Defense": 55,
    "Speed": 85
  }
},
{
  "id": 121,
  "name": "Starmie",
  "type": [
    "Water",
    "Psychic"
  ],
  "evolvesFrom": 120,
  "base": {
    "HP": 60,
    "Attack": 75,
    "Defense": 85,
    "Sp. Attack": 100,
    "Sp. Defense": 85,
    "Speed": 115
  }
},
{
  "id": 122,
  "name": "Mr. Mime",
  "type": [
    "Psychic",
    "Fairy"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 40,
    "Attack": 45,
    "Defense": 65,
    "Sp. Attack": 100,
    "Sp. Defense": 120,
    "Speed": 90
  }
},
{
  "id": 123,
  "name": "Scyther",
  "type": [
    "Bug",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 70,
    "Attack": 110,
    "Defense": 80,
    "Sp. Attack": 55,
    "Sp. Defense": 80,
    "Speed": 105
  }
},
{
  "id": 124,
  "name": "Jynx",
  "type": [
    "Ice",
    "Psychic"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 65,
    "Attack": 50,
    "Defense": 35,
    "Sp. Attack": 115,
    "Sp. Defense": 95,
    "Speed": 95
  }
},
{
  "id": 125,
  "name": "Electabuzz",
  "type": [
    "Electric"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 65,
    "Attack": 83,
    "Defense": 57,
    "Sp. Attack": 95,
    "Sp. Defense": 85,
    "Speed": 105
  }
},
{
  "id": 126,
  "name": "Magmar",
  "type": [
    "Fire"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 65,
    "Attack": 95,
    "Defense": 57,
    "Sp. Attack": 100,
    "Sp. Defense": 85,
    "Speed": 93
  }
},
{
  "id": 127,
  "name": "Pinsir",
  "type": [
    "Bug"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 65,
    "Attack": 125,
    "Defense": 100,
    "Sp. Attack": 55,
    "Sp. Defense": 70,
    "Speed": 85
  }
},
{
  "id": 128,
  "name": "Tauros",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 75,
    "Attack": 100,
    "Defense": 95,
    "Sp. Attack": 40,
    "Sp. Defense": 70,
    "Speed": 110
  }
},
{
  "id": 129,
  "name": "Magikarp",
  "type": [
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 20,
    "Attack": 10,
    "Defense": 55,
    "Sp. Attack": 15,
    "Sp. Defense": 20,
    "Speed": 80
  }
},
{
  "id": 130,
  "name": "Gyarados",
  "type": [
    "Water",
    "Flying"
  ],
  "evolvesFrom": 129,
  "base": {
    "HP": 95,
    "Attack": 125,
    "Defense": 79,
    "Sp. Attack": 60,
    "Sp. Defense": 100,
    "Speed": 81
  }
},
{
  "id": 131,
  "name": "Lapras",
  "type": [
    "Water",
    "Ice"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 130,
    "Attack": 85,
    "Defense": 80,
    "Sp. Attack": 85,
    "Sp. Defense": 95,
    "Speed": 60
  }
},
{
  "id": 132,
  "name": "Ditto",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 48,
    "Attack": 48,
    "Defense": 48,
    "Sp. Attack": 48,
    "Sp. Defense": 48,
    "Speed": 48
  }
},
{
  "id": 133,
  "name": "Eevee",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 55,
    "Attack": 55,
    "Defense": 50,
    "Sp. Attack": 45,
    "Sp. Defense": 65,
    "Speed": 55
  }
},
{
  "id": 134,
  "name": "Vaporeon",
  "type": [
    "Water"
  ],
  "evolvesFrom": 133,
  "base": {
    "HP": 130,
    "Attack": 65,
    "Defense": 60,
    "Sp. Attack": 110,
    "Sp. Defense": 95,
    "Speed": 65
  }
},
{
  "id": 135,
  "name": "Jolteon",
  "type": [
    "Electric"
  ],
  "evolvesFrom": 133,
  "base": {
    "HP": 65,
    "Attack": 65,
    "Defense": 60,
    "Sp. Attack": 110,
    "Sp. Defense": 95,
    "Speed": 130
  }
},
{
  "id": 136,
  "name": "Flareon",
  "type": [
    "Fire"
  ],
  "evolvesFrom": 133,
  "base": {
    "HP": 65,
    "Attack": 130,
    "Defense": 60,
    "Sp. Attack": 95,
    "Sp. Defense": 110,
    "Speed": 65
  }
},
{
  "id": 137,
  "name": "Porygon",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 65,
    "Attack": 60,
    "Defense": 70,
    "Sp. Attack": 85,
    "Sp. Defense": 75,
    "Speed": 40
  }
},
{
  "id": 138,
  "name": "Omanyte",
  "type": [
    "Rock",
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 35,
    "Attack": 40,
    "Defense": 100,
    "Sp. Attack": 90,
    "Sp. Defense": 55,
    "Speed": 35
  }
},
{
  "id": 139,
  "name": "Omastar",
  "type": [
    "Rock",
    "Water"
  ],
  "evolvesFrom": 138,
  "base": {
    "HP": 70,
    "Attack": 60,
    "Defense": 125,
    "Sp. Attack": 115,
    "Sp. Defense": 70,
    "Speed": 55
  }
},
{
  "id": 140,
  "name": "Kabuto",
  "type": [
    "Rock",
    "Water"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 30,
    "Attack": 80,
    "Defense": 90,
    "Sp. Attack": 55,
    "Sp. Defense": 45,
    "Speed": 55
  }
},
{
  "id": 141,
  "name": "Kabutops",
  "type": [
    "Rock",
    "Water"
  ],
  "evolvesFrom": 140,
  "base": {
    "HP": 60,
    "Attack": 115,
    "Defense": 105,
    "Sp. Attack": 65,
    "Sp. Defense": 70,
    "Speed": 80
  }
},
{
  "id": 142,
  "name": "Aerodactyl",
  "type": [
    "Rock",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 80,
    "Attack": 105,
    "Defense": 65,
    "Sp. Attack": 60,
    "Sp. Defense": 75,
    "Speed": 130
  }
},
{
  "id": 143,
  "name": "Snorlax",
  "type": [
    "Normal"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 160,
    "Attack": 110,
    "Defense": 65,
    "Sp. Attack": 65,
    "Sp. Defense": 110,
    "Speed": 30
  }
},
{
  "id": 144,
  "name": "Articuno",
  "type": [
    "Ice",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 90,
    "Attack": 85,
    "Defense": 100,
    "Sp. Attack": 95,
    "Sp. Defense": 125,
    "Speed": 85
  }
},
{
  "id": 145,
  "name": "Zapdos",
  "type": [
    "Electric",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 90,
    "Attack": 90,
    "Defense": 85,
    "Sp. Attack": 125,
    "Sp. Defense": 90,
    "Speed": 100
  }
},
{
  "id": 146,
  "name": "Moltres",
  "type": [
    "Fire",
    "Flying"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 90,
    "Attack": 100,
    "Defense": 90,
    "Sp. Attack": 125,
    "Sp. Defense": 85,
    "Speed": 90
  }
},
{
  "id": 147,
  "name": "Dratini",
  "type": [
    "Dragon"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 41,
    "Attack": 64,
    "Defense": 45,
    "Sp. Attack": 50,
    "Sp. Defense": 50,
    "Speed": 50
  }
},
{
  "id": 148,
  "name": "Dragonair",
  "type": [
    "Dragon"
  ],
  "evolvesFrom": 147,
  "base": {
    "HP": 61,
    "Attack": 84,
    "Defense": 65,
    "Sp. Attack": 70,
    "Sp. Defense": 70,
    "Speed": 70
  }
},
{
  "id": 149,
  "name": "Dragonite",
  "type": [
    "Dragon",
    "Flying"
  ],
  "evolvesFrom": 148,
  "base": {
    "HP": 91,
    "Attack": 134,
    "Defense": 95,
    "Sp. Attack": 100,
    "Sp. Defense": 100,
    "Speed": 80
  }
},
{
  "id": 150,
  "name": "Mewtwo",
  "type": [
    "Psychic"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 106,
    "Attack": 110,
    "Defense": 90,
    "Sp. Attack": 154,
    "Sp. Defense": 90,
    "Speed": 130
  }
},
{
  "id": 151,
  "name": "Mew",
  "type": [
    "Psychic"
  ],
  "evolvesFrom": null,
  "base": {
    "HP": 100,
    "Attack": 100,
    "Defense": 100,
    "Sp. Attack": 100,
    "Sp. Defense": 100,
    "Speed": 100
  }
}];

let POKEMON_BY_ID: { [id: string]: PokemonData } = {};

pokemon_array.forEach((pokemonData: PokemonData) => POKEMON_BY_ID[pokemonData.id] = pokemonData);

export default POKEMON_BY_ID;

export const getRandomPokemon = (isBasic: boolean = false): { pokemonId: number, pokemonData: PokemonData, pokemonSprite: string } => {
  let pokemonId: number;
  let pokemonData: PokemonData;

  do { 
    pokemonId = Math.floor(Math.random() * (151 - 1) ) + 1;
    pokemonData = POKEMON_BY_ID[pokemonId];
  } while (isBasic && pokemonData.evolvesFrom)

  return {
    pokemonId, 
    pokemonData, 
    pokemonSprite: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${`${pokemonId}`.padStart(3, '0')}MS.png`,
  };
}

