import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Button, Icon, Overlay, Slider } from 'react-native-elements';
import { produce } from 'immer';
import Gameboard, { GameboardCellData } from './Gameboard';
import { getPokemonByStrengthAndType, PokemonData, PokemonType } from './Pokemon';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

const GAMEBOARD_NUM_ROWS = 10;
const GAMEBOARD_NUM_COLS = 10;
const STARTING_ENERGY = 5;
const MAX_ENERGY = 10;

export type GameState = 'SELECT_ACTION' | SelectedGameAction;
export type ExecutableGameAction = 'SPAWN' | 'MOVE' | 'ATTACK';
export type SelectedGameAction = ExecutableGameAction | 'UNDO' | 'CONFIRM';
export type GameStateActions = { [gameState in GameState]: { headerText: string, buttons: any[] } };

// TODO - take in game data as props from App.tsx
export default function Game() {

    const [gameBoardData, setGameBoardData] = useState<GameboardCellData[][]>([]);
    const [gameState, setGameState] = useState<GameState>('SELECT_ACTION');
    const [gameStateActions, setGameStateActions] = useState<GameStateActions>();
    const [executableGameAction, setExecutableGameAction] = useState<ExecutableGameAction>();

    const [availableEnergy, setAvailableEnergy] = useState<number>(STARTING_ENERGY);
    const [energyToUse, setEnergyToUse] = useState<number>(1);

    const [showTypeSelectionModal, setShowTypeSelectionModal] = useState<boolean>(false);
    const [typeToSpawn, setTypeToSpawn] = useState<PokemonType>('Water'); // TODO - change this to something different
    
    const spawnButton = (
        <Button
            key="spawnButton"
            title="Spawn"
            icon={
                <Icon
                    type='font-awesome-5'
                    name='magic'
                    color='white'
                    style={styles.actionButtonIcon}
                />
            }
            buttonStyle={{ backgroundColor: 'green' }}
            onPress={() => onGameActionButtonPress('SPAWN')}
        />
    );

    const moveButton = (
        // TODO - disable if no troops on board
        <Button
            key="moveButton"
            title="Move"
            icon={
                <Icon
                    type='font-awesome-5'
                    name='expand-arrows-alt'
                    color='white'
                    style={styles.actionButtonIcon}
                />
            }
            // buttonStyle={{ backgroundColor: 'blue' }}
            onPress={() => onGameActionButtonPress('MOVE')}
        />
    );

    const attackButton = (
        // TODO - disable if no troops on board, or if can't attack
        <Button
            key="attackButton"
            title="Attack"
            icon={
                <Icon
                    type='font-awesome-5'
                    name='bomb'
                    color='white'
                    style={styles.actionButtonIcon}
                />
            }
            buttonStyle={{ backgroundColor: 'orange' }}
            onPress={() => onGameActionButtonPress('ATTACK')}
        />
    );

    const undoButton = (
        <Button
            key="undoButton"
            title="Undo"
            type="outline"
            icon={
                <Icon
                    type='font-awesome-5'
                    name='undo'
                    color='#2089dc'
                    style={styles.actionButtonIcon}
                />
            }
            onPress={() => onGameActionButtonPress('UNDO')}
        />
    );

    const confirmButton = (
        <Button
            key="confirmButton"
            title="Confirm"
            icon={
                <Icon
                    type='font-awesome-5'
                    name='check-circle'
                    color='white'
                    style={styles.actionButtonIcon}
                />
            }
            disabled={energyToUse === 0}
            buttonStyle={{ backgroundColor: 'green' }}
            onPress={() => onGameActionButtonPress('CONFIRM')}
        />
    );

    const energySlider = (
        <View key="energySlider">
            <Text>How much energy do you want to use? [{energyToUse}]</Text>
            <Slider
                value={energyToUse}
                onSlidingComplete={(value) => onEnergySliderUpdate(value)}
                minimumValue={0}
                maximumValue={availableEnergy}
                step={1}
            />
        </View>
    );

    const pokemonType = (
        // TODO - later, build out modal and picker to allow user to pick the ype
        <View key="pokemonType">
            <Text>Type: {typeToSpawn}</Text>
        </View>
    )

    useEffect(() => {
        console.log(`[Game][useEffect]`);

        // TODO - populate state from props

        const data = [];
        for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
            const row = [];
            for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
                row.push(new GameboardCellData());
            }
            data.push(row);
        }
        setGameBoardData(data);
    }, []);

    useEffect(() => {
        setGameStateActions({
            SELECT_ACTION: {
                headerText: 'Select an action',
                buttons: [spawnButton, moveButton, attackButton],
            },
            SPAWN: {
                headerText: 'SPAWN',
                buttons: [energySlider, pokemonType, confirmButton, undoButton],
            },
            MOVE: {
                headerText: 'MOVE',
                buttons: [energySlider, confirmButton, undoButton],
            },
            ATTACK: {
                headerText: 'ATTACK',
                buttons: [energySlider, confirmButton, undoButton],
            },
            UNDO: { // Rename to energy selection
                headerText: '',
                buttons: [],
            },
            CONFIRM: { // Rename to executing action
                headerText: `Doing... ${executableGameAction}`,
                buttons: [],
            }
        });
    }, [energyToUse, executableGameAction])

    const onEnergySliderUpdate = (value: number) => {
        console.log(`[Game][onEnergySliderUpdate] - value: ${value}`);
        setEnergyToUse(value);
    }

    const onCellPress = (row: number, column: number) => {
        console.log(`[Game][onCellPress]
            row: ${row}
            column: ${column}
        `);

        if (executableGameAction === 'SPAWN') {
            const pokemon: PokemonData = getPokemonByStrengthAndType(energyToUse, MAX_ENERGY, typeToSpawn);

            console.log(`[Game][onCellPress] - random pokemon
            pokemon: ${JSON.stringify(pokemon)}
        `);

            setGameBoardData(produce(gameBoardData, draft => {
                draft[row][column] = new GameboardCellData(pokemon);
                for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
                    for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
                        draft[i][j].allowPress = false;
                        draft[i][j].isPotentialSpawn = false;
                    }
                }
            }));

            setGameState('SELECT_ACTION');
            setAvailableEnergy(availableEnergy + 1);
            // this means the end of one turn. so now it's is time for the opposition. it won't be a second player, or an autoplayer. 
            // it will just be obsticles like covers, etc.the goal awalk aound the space of the board. spawn, and must go to respqned plaws to get it to join team.
            // team as a whole will battle or attack the things thave comes up on the board when you amake your action actions. so the basiaclly just fight all of them
            // try to step on each square
        }
    }


    const onCellLongPress = (row: number, column: number) => {
        console.log(`[Game][onCellPress]
            row: ${row}
            column: ${column}
        `);
    }

    const onGameActionButtonPress = (action: SelectedGameAction) => {
        console.log(`[Game][onGameActionButtonPress]
            action: ${action}
        `);

        if (action === 'SPAWN') {
            setGameState(action);
            setExecutableGameAction(action);
        } else if (action === 'MOVE') {
            setGameState(action);
            setExecutableGameAction(action);
        } else if (action === 'ATTACK') {
            setGameState(action);
            setExecutableGameAction(action);
        } else if (action === 'CONFIRM') {
            console.log(`[Game][onGameActionButtonPress][action=confirm]
                executableGameAction: ${executableGameAction}
            `);
            setAvailableEnergy(availableEnergy - energyToUse);
            setGameState('CONFIRM');
            executeAction();
        } else { // UNDO
            setGameState('SELECT_ACTION');
        }
    }

    const executeAction = () => {
        console.log(`[Game][executeAction][action=${executableGameAction}]`);

        if (executableGameAction === 'SPAWN') {
            const potentialSpawnCells: Set<{ row: number, col: number }> = new Set<{ row: number, col: number }>();

            while (potentialSpawnCells.size < energyToUse) {
                const row = Math.floor(Math.random() * GAMEBOARD_NUM_ROWS);
                const col = Math.floor(Math.random() * GAMEBOARD_NUM_COLS);

                console.log(`[Game][executeAction][action=SPAWN]
                    row: ${row}
                    col: ${col}
                `);
                if (!gameBoardData[row][col].pokemonData) {
                    potentialSpawnCells.add({ row, col });
                }
            }

            console.log(`[Game][executeAction][action=SPAWN]
            potentialSpawnCells: ${JSON.stringify(potentialSpawnCells)}
            `);
            setGameBoardData(produce(gameBoardData, (draft) => {
                potentialSpawnCells.forEach((spawn) => {
                    draft[spawn.row][spawn.col].isPotentialSpawn = true;
                    draft[spawn.row][spawn.col].allowPress = true;
                });
            }));
        } else if (executableGameAction === 'MOVE') {

        } else if (executableGameAction === 'ATTACK') {

        } else {

        }
        setEnergyToUse(1);
    }

    return (
        <View style={styles.container}>
            <Gameboard
                numRows={GAMEBOARD_NUM_ROWS}
                numCols={GAMEBOARD_NUM_COLS}
                gameBoardData={gameBoardData}
                gameState={gameState}
                onCellPress={(row: number, cell: number) => onCellPress(row, cell)}
                onCellLongPress={(row: number, cell: number) => onCellLongPress(row, cell)}
                gameStateActions={gameStateActions}
                availableEnergy={availableEnergy}
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
    actionButtonIcon: {
        marginRight: 10,
    },
});