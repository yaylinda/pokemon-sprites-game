import csv
import json

POKEMON_STATS_CSV = 'pokemon.csv'
POKEMON_STATS_COLUMNS = ["id","code","serial","name","type_1","type_2","color","ability_1","ability_2","ability_hidden","generation","legendary","mega_evolution","height","weight","hp","attack","defense","special_attack","special_defense","speed","total"]

POKEMON_SPRITE_CSV = 'metadata.csv'
POKEMON_SPRITE_COLUMNS = ["id","sprite_url","filename"]


def read_csv(file_name, columns):
    csv_file = open(file_name)
    reader = csv.DictReader(csv_file)
    data = []
    for row in reader:
        datum = {}
        for column in columns:
            datum[column] = row[column]
        data.append(datum)

    csv_file.close()
    return data


def transform_to_map(array_data):
    data = {}

    for datum in array_data:
        id = datum['id']
        data[id] = datum

    return data


def merge_data(pokemon, sprites):
    for p in pokemon:

        id = p['id']
        if id in sprites:
            p['sprite_url'] = sprites[id]['sprite_url']
            p['filename'] = sprites[id]['filename']

    return pokemon


def main():
    pokemon = read_csv(POKEMON_STATS_CSV, POKEMON_STATS_COLUMNS)
    sprite_metadata = read_csv(POKEMON_SPRITE_CSV, POKEMON_SPRITE_COLUMNS)
    sprite_metadata_id_map = transform_to_map(sprite_metadata)
    data = merge_data(pokemon, sprite_metadata_id_map)

    with open('pokemon-data.json', 'w') as json_output:
        json.dump(data, json_output)
    
    print('\nDone!')


if __name__ == '__main__':
    main()
