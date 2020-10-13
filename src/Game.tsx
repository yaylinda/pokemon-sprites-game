import { produce } from 'immer';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Slider } from 'react-native-elements';
import { getPokemonByStrengthAndType, PokemonData, PokemonType } from './Pokemon';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

const CELL_MARGIN_WIDTH = 4;
const CELL_BORDER_WIDTH = 1;
const GAMEBOARD_NUM_ROWS = 3;
const GAMEBOARD_NUM_COLS = 3;
const CELL_SIZE: number = (WIDTH - (CELL_BORDER_WIDTH * GAMEBOARD_NUM_COLS * 2)) / GAMEBOARD_NUM_COLS;
// const STARTING_ENERGY = 5;
const STARTING_ENERGY = 10;
const MAX_ENERGY = 10;

class GameboardCellData {
    allowPress: boolean;
    allowLongPress: boolean;
    isPressed: boolean;
    isLongPressed: boolean;
    isPotentialSpawn: boolean;
    pokemonData: PokemonData;

    constructor() {
        this.allowPress = false;
        this.allowLongPress = false;
        this.isPressed = false;
        this.isLongPressed = false;
        this.isPotentialSpawn = false;
        this.pokemonData = {
            id: '',
            name: '',
            type_1: '',
            type_2: '',
            color: '',
            ability_1: '',
            ability_2: '',
            ability_hidden: '',
            generation: '',
            legendary: '',
            mega_evolution:'',
            height: '',
            weight: '',
            hp: '',
            attack: '',
            defense: '',
            special_attack: '',
            special_defense: '',
            speed: '',
            total: '',
            sprite_url: '',
            filename: '',
        };
    }
}

export type GameState = 'SELECT_ACTION' | SelectedGameAction;
export type ExecutableGameAction = 'SPAWN' | 'MOVE' | 'ATTACK';
export type SelectedGameAction = ExecutableGameAction | 'UNDO' | 'CONFIRM';
export type GameStateActions = { [gameState in GameState]: { headerText: string, buttons: any[] } };


// TODO - take in game data as props from App.tsx
export default function Game() {

    const [gameBoardData, setGameBoardData] = useState<GameboardCellData[][]>([]);
    const [gameState, setGameState] = useState<GameState>('SELECT_ACTION');
    const [gameStateActions, setGameStateActions] = useState<GameStateActions>();
    const [executableGameAction, setExecutableGameAction] = useState<ExecutableGameAction>('ATTACK');

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
                minimumValue={1}
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
    }, [executableGameAction, typeToSpawn, energyToUse, availableEnergy, gameBoardData])

    const onEnergySliderUpdate = (value: number) => {
        console.log(`[Game][onEnergySliderUpdate] - value: ${value}`);
        setEnergyToUse(value);
    }

    const handleCellPress = useCallback((row: number, column: number) => {
        console.log(`[Game][handleCellPress]
            row: ${row}
            column: ${column}
            executableGameAction: ${executableGameAction}
            typeToSpawn: ${typeToSpawn}
            energyToUse: ${energyToUse}
            availableEnergy: ${availableEnergy}
        `);

        if (executableGameAction === 'SPAWN') {
            const pokemon: PokemonData = getPokemonByStrengthAndType(energyToUse, MAX_ENERGY, typeToSpawn);

            console.log(`[Game][handleCellPress] - spawned ${pokemon.name}`);

            
            console.log(`[Game][handleCellPress] BEFORE *****************
                gameBoardData: ${JSON.stringify(gameBoardData)}
            `);


            setGameBoardData(produce(gameBoardData, draft => {
                draft[row][column].pokemonData = pokemon;
                for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
                    for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
                        draft[i][j].allowPress = false;
                        draft[i][j].isPotentialSpawn = false;
                    }
                }
            }));

            console.log(`[Game][handleCellPress] AFTER *******************
                gameBoardData: ${JSON.stringify(gameBoardData)}
            `);

            setGameState('SELECT_ACTION');
            // setAvailableEnergy(availableEnergy + 1);
            setEnergyToUse(1);
            // this means the end of one turn. so now it's is time for the opposition. it won't be a second player, or an autoplayer. 
            // it will just be obsticles like covers, etc.the goal awalk aound the space of the board. spawn, and must go to respqned plaws to get it to join team.
            // team as a whole will battle or attack the things thave comes up on the board when you amake your action actions. so the basiaclly just fight all of them
            // try to step on each square
        }
    }, [executableGameAction, typeToSpawn, energyToUse, availableEnergy, gameBoardData]);


    const handleCellLongPress = (row: number, column: number) => {
        console.log(`[Game][handleCellLongPress]
            row: ${row}
            column: ${column}
        `);
    }

    const onGameActionButtonPress = useCallback((action: SelectedGameAction) => {
        console.log(`[Game][onGameActionButtonPress]
            action: ${action}
        `);

        if (['SPAWN', 'MOVE', 'ATTACK'].includes(action)) {
            setGameState(action);
            setExecutableGameAction(action as ExecutableGameAction);
        } else if (action === 'CONFIRM') {
            console.log(`[Game][onGameActionButtonPress][action=confirm]
                executableGameAction: ${executableGameAction}
                energyToUse: ${energyToUse}
                availableEnergy: ${availableEnergy}
            
            `);
            setAvailableEnergy(availableEnergy - energyToUse);
            setGameState('CONFIRM');
            executeAction();
        } else { // UNDO
            setGameState('SELECT_ACTION');
        }
    }, [executableGameAction, availableEnergy, energyToUse]);

    const executeAction = useCallback(() => {
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
                if (!gameBoardData[row][col].pokemonData.name) {
                    potentialSpawnCells.add({ row, col });
                }
            }

            console.log(`[Game][executeAction][action=SPAWN]
            potentialSpawnCells: ${potentialSpawnCells.size}
            `);

            
            setGameBoardData(produce(gameBoardData, (draft) => {
                potentialSpawnCells.forEach((spawn) => {
                    draft[spawn.row][spawn.col].isPotentialSpawn = true;
                    draft[spawn.row][spawn.col].allowPress = true;
                });
            }));

            console.log(`[Game][executeAction][action=SPAWN] AFTER
            gameBoardData: ${JSON.stringify(gameBoardData)}
        `);
        } else if (executableGameAction === 'MOVE') {

        } else if (executableGameAction === 'ATTACK') {

        } else {

        }
    }, [executableGameAction, gameBoardData, availableEnergy])

    const renderPokemonImage = (pokemonSprite: string) => {
        if (!pokemonSprite) return null;

        return (
            <Image
                style={{
                    resizeMode: 'cover',
                    height: CELL_SIZE - 2,
                    width: CELL_SIZE - 2,
                }}
                source={{ uri: pokemonSprite }}
            />
        );
    }

    const renderCell = (rowIndex: number, columnIndex: number) => {
        const cellData: GameboardCellData | null = gameBoardData && gameBoardData[rowIndex] && gameBoardData[rowIndex][columnIndex] ? gameBoardData[rowIndex][columnIndex] : null;
        // const borderColor: string = cellData ? (cellData.isPressed ? 'green' : (cellData.isLongPressed ? 'blue' : 'gray')) : 'gray';
        
        if (!cellData) {
            return null;
        }

        return (
            <TouchableOpacity
                key={`row_${rowIndex}_col_${columnIndex}`}
                style={[
                    styles.cell, {
                        minWidth: CELL_SIZE,
                        maxWidth: CELL_SIZE,
                        minHeight: CELL_SIZE,
                        maxHeight: CELL_SIZE,
                        borderColor: 'lightgrey',
                        borderRightWidth: columnIndex + 1 === GAMEBOARD_NUM_COLS ? 1 : 0,
                        borderBottomWidth: rowIndex + 1 === GAMEBOARD_NUM_ROWS ? 1 : 0,
                        backgroundColor: cellData.isPotentialSpawn ? 'lightgreen' : 'white',
                    }]}
                onPress={() => cellData.allowPress && handleCellPress(rowIndex, columnIndex)}
                onLongPress={() => cellData.allowLongPress && handleCellLongPress(rowIndex, columnIndex)}
            >
                { renderPokemonImage(cellData.pokemonData?.sprite_url || '')}
            </TouchableOpacity>
        );
    }

    const renderTopSection = () => {
        if (gameState && gameStateActions && gameStateActions[gameState]) {
            return (
                <View style={styles.topSection}>
                    <Text>{gameStateActions[gameState].headerText}</Text>
                    <View style={styles.statsSection}>
                        <View>
                            <Text>Available Energy</Text>
                            <Text>{availableEnergy}</Text>
                        </View>
                        <View style={styles.statsSeparator}/>
                        <View>
                            <Text>TODO</Text>
                            <Text>TODO</Text>
                        </View>
                        <View style={styles.statsSeparator}/>
                        <View>
                            <Text>TODO</Text>
                            <Text>TODO</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }

    const renderBottomSection = () => {
        if (gameState && gameStateActions && gameStateActions[gameState]) {
            return (
                <View style={styles.bottomSection}>
                    <View style={styles.actionsButtons}>
                        {gameStateActions[gameState].buttons}
                    </View>
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            {
                renderTopSection()
            }
            {
                Array.from(Array(GAMEBOARD_NUM_ROWS).keys()).map(rowIndex => (
                    <View key={`row_${rowIndex}`} style={[styles.row, { maxHeight: CELL_SIZE, minHeight: CELL_SIZE }]}>
                        {
                            Array.from(Array(GAMEBOARD_NUM_COLS).keys()).map(columnIndex => renderCell(rowIndex, columnIndex,))
                        }
                    </View>
                ))
            }
            {
                renderBottomSection()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
    },
    actionButtonIcon: {
        marginRight: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cell: {
        flex: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
    },
    topSection: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 25,
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    statsSeparator: {
        borderWidth: 0.5,
        borderColor: 'gray',
        width: 1,
    },
    bottomSection: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    actionsHeader: {
        // borderBottomColor: 'gray',
        // borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionsButtons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});