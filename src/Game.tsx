import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { produce } from 'immer';
import Gameboard, { GameboardCellData } from './Gameboard';
import { getRandomPokemon } from './Pokemon';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

const GAMEBOARD_SIZE: number = 10;

export default function Game() {

    const [gameboardData, setGameboardData] = useState<GameboardCellData[][]>([]);

    useEffect(() => {
        console.log(`[Game][useEffect]`);
        setGameboardData([...Array(GAMEBOARD_SIZE)].map(e => Array(GAMEBOARD_SIZE).fill(new GameboardCellData())));
    }, []);

    const onCellPress = (row: number, column: number) => {
        console.log(`[Game][onCellPress]
            row: ${row}
            column: ${column}
        `);
    }

    const onCellLongPress = (row: number, column: number) => {
        console.log(`[Game][onCellLongPress]
            row: ${row}
            column: ${column}
        `);

        const { pokemonId, pokemonData, pokemonSprite } = getRandomPokemon();

        console.log(`[Game][onCellLongPress] - random pokemon
            pokemonData: ${JSON.stringify(pokemonData)}
            pokemonSprite: ${pokemonSprite}
        `);

        setGameboardData(produce(gameboardData, draft => {
            draft[row][column] = new GameboardCellData(false, true, pokemonData, pokemonSprite);
        }))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <View style={styles.body}>
                <Gameboard 
                    size={GAMEBOARD_SIZE} 
                    data={gameboardData} 
                    onCellPress={(row: number, cell: number) => onCellPress(row, cell)}
                    onCellLongPress={(row: number, cell: number) => onCellLongPress(row, cell)}
                />
            </View>
            <View style={styles.footer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%'
    },
    header: {
        flex: 1,
        maxHeight: HEIGHT * 0.2,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    body: {
        flex: 1,
    },
    footer: {
        flex: 1,
        maxHeight: HEIGHT * 0.2,
        borderTopColor: 'gray',
        borderTopWidth: 1,
    },
});