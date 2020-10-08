import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { produce } from 'immer';
import Gameboard, { GameboardCellData } from './Gameboard';
import { getRandomPokemon } from './Pokemon';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

const GAMEBOARD_NUM_ROWS = 8;
const GAMBOARD_NUM_COLS = 8;

export default function Game() {

    const [gameBoardData, setGameBoardData] = useState<GameboardCellData[][]>([]);
    const [endZoneData, setEndZoneData] = useState<GameboardCellData[]>([]);

    useEffect(() => {
        console.log(`[Game][useEffect]`);
        setGameBoardData([...Array(GAMEBOARD_NUM_ROWS)].map(e => Array(GAMBOARD_NUM_COLS).fill(new GameboardCellData())));
        setEndZoneData(Array(GAMBOARD_NUM_COLS).fill(new GameboardCellData()));
    }, []);

    const onCellPress = (row: number, column: number) => {
        console.log(`[Game][onCellPress]
            row: ${row}
            column: ${column}
        `);

        const { pokemonId, pokemonData, pokemonSprite } = getRandomPokemon(true);

        console.log(`[Game][onCellPress] - random pokemon
            pokemonData: ${JSON.stringify(pokemonData)}
            pokemonSprite: ${pokemonSprite}
        `);

        setGameBoardData(produce(gameBoardData, draft => {
            draft[row][column] = new GameboardCellData(pokemonData, pokemonSprite);
        }))
    }

    const onCellLongPress = (row: number, column: number) => {
        console.log(`[Game][onCellPress]
            row: ${row}
            column: ${column}
        `);

    }

    return (
        <View style={styles.container}>
            <Gameboard
                numRows={GAMEBOARD_NUM_ROWS}
                numCols={GAMBOARD_NUM_COLS}
                gameBoardData={gameBoardData}
                endZoneData={endZoneData}
                onCellPress={(row: number, cell: number) => onCellPress(row, cell)}
                onCellLongPress={(row: number, cell: number) => onCellLongPress(row, cell)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
    },
});