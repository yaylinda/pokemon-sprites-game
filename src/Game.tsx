import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { produce } from 'immer';
import Gameboard, { GameboardCellData } from './Gameboard';
import { getRandomPokemon } from './Pokemon';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

const GAMEBOARD_NUM_ROWS = 12;
const GAMBOARD_NUM_COLS = 12;

export type GameState = 'SELECT_ACTION' | SelectedGameAction;
export type SelectedGameAction = 'SPAWN' | 'MOVE' | 'ATTACK';
export type GameStateActions = { [gameState in GameState]: { headerText: string, buttons: any[] }};

export default function Game() {

    const [gameBoardData, setGameBoardData] = useState<GameboardCellData[][]>([]);
    const [gameState, setGameState] = useState<GameState>('SELECT_ACTION');
    const [gameStateActions, setGameStateActions] = useState<GameStateActions>();

    const spawnButton = (
        <Button 
        title="Spawn" 
        icon={<Icon type='font-awesome-5' name='magic' />} 
        onPress={() => onGameActionButtonPress('SPAWN')}
        />
    );

    const moveButton = (
        <Button 
        title="Move" 
        icon={<Icon type='font-awesome-5' name='expand-arrows-alt' />} 
        onPress={() => onGameActionButtonPress('MOVE')}
        />
    );

    const attackButton = (
        <Button 
        title="Attack" 
        icon={<Icon type='font-awesome-5' name='bomb' />} 
        onPress={() => onGameActionButtonPress('ATTACK')}
        />
    );

    useEffect(() => {
        console.log(`[Game][useEffect]`);
        setGameBoardData([...Array(GAMEBOARD_NUM_ROWS)].map(e => Array(GAMBOARD_NUM_COLS).fill(new GameboardCellData())));
        setGameStateActions({
            SELECT_ACTION: {
                headerText: 'Select an action:',
                buttons: [spawnButton, moveButton, attackButton],
            },
            SPAWN: {
                headerText: 'Select a spawn location:',
                buttons: [],
            },
            MOVE: {
                headerText: 'Select a Thing to move:',
                buttons: [],
            },
            ATTACK: {
                headerText: 'Do an attack:',
                buttons: [],
            },
        });
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

    const onGameActionButtonPress = (action: SelectedGameAction) => {
        console.log(`[Game][onGameActionButtonPress] - action: ${action}`);
    }

    return (
        <View style={styles.container}>
            <Gameboard
                numRows={GAMEBOARD_NUM_ROWS}
                numCols={GAMBOARD_NUM_COLS}
                gameBoardData={gameBoardData}
                gameState={gameState}
                onCellPress={(row: number, cell: number) => onCellPress(row, cell)}
                onCellLongPress={(row: number, cell: number) => onCellLongPress(row, cell)}
                gameStateActions={gameStateActions}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
    },
});