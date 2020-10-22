import { Picker } from '@react-native-community/picker';
import { produce } from 'immer';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Slider } from 'react-native-elements';
import { getRandomStarterForType, PokemonData, PokemonType } from './Pokemon';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

const CELL_MARGIN_WIDTH = 4;
const CELL_BORDER_WIDTH = 1;
const GAMEBOARD_NUM_ROWS = 10;
const GAMEBOARD_NUM_COLS = 10;
const CELL_SIZE: number = (WIDTH - (CELL_BORDER_WIDTH * GAMEBOARD_NUM_COLS * 2)) / GAMEBOARD_NUM_COLS;
// const STARTING_ENERGY = 5;
const STARTING_ENERGY = 10;
const MAX_ENERGY = 10;

type PokemonPreviewInfo = {
    pokemonData: PokemonData;
}

type StarterTypes = 'Grass' | 'Fire' | 'Water';

class GameboardCellData {
    isPressed: boolean;
    isLongPressed: boolean;
    isMoveTarget: boolean;
    isPotentialMoveDestination: boolean;
    pokemonData?: PokemonData;
    ownedByType?: StarterTypes;

    constructor() {
        this.isPressed = false;
        this.isLongPressed = false;
        this.isMoveTarget = false;
        this.isPotentialMoveDestination = false;
        this.pokemonData = undefined;
        this.ownedByType = undefined; 
    }
}

type GameState =
    'PENDING_START_GAME' |
    'SELECT_ACTION' |
    // 'MOVE' | 'ATTACK' |
    'SELECT_ENERGY_FOR_SPAWN' | 'SPAWN' |
    'SELECT_ENERGY_FOR_MOVE' | 'SELECT_MOVE_TARGET' | 'SELECT_MOVE_DESTINATION' |
    'SELECT_ENERGY_FOR_ATTACK' | 'SELECT_ATTACK_TARGET' | 'SELECT_ATTACK' |
    'UNDO';

type GameStateConfigurations = {
    [gameState in GameState]: {
        headerText: string,
        inputs: any[]
    }
};

const COLOR_BY_TYPE: { [type in StarterTypes] : string } = {
    Grass: 'rgba(119, 204, 85, 0.2)',
    Fire: 'rgba(255, 68, 34, 0.2)',
    Water: 'rgba(51, 153, 255, 0.2)',
}

/**
 * Limit this to just starter pokemon, and only use their 3 types for some gameplay insteractions
 * randomly spawn one starter/type, and then try to combine types to become stronger and fight for squares
 * agains other types. but you have to play both sides. 
 * or, you pick a color and play with 2 ai that get one of the other types, and you can fight
 * goal could be to try to get as any squares as possible with you pokemon by moving around. 
 * spawn # is how many of the pokemon to spawn. if you spawn duplicates, you will be able to evolve, once they are moved together.
 * evolving makes them stronger all starters would be good to have because of the types that leds itself well to some game play mechnics
 * 
 * Goal is against 2 other plays, try to take over the board and eliminate others squares. idk something like that. will need to have some sort of
 * actual pokemon battle, with the moves data too
 * 
 * okay so instead of using all the pokemon, just use the starters and give them some more data, like moves. and who evolves into who, and the teams they are in
 * 
 * might need to start over and have the user pick a color as the starting board. show opponents on board. left and right side of the bottom space
 * i will show my stuff on top. it will be some stats like points, and the color of the team. might need to change the ui of how move selection should be done
 * 
 */

// TODO - take in game data as props from App.tsx
export default function Game() {

    const [gameBoardData, setGameBoardData] = useState<GameboardCellData[][]>([]);

    const [previousGameState, setPreviousGameState] = useState<GameState>('PENDING_START_GAME');
    const [currentGameState, setCurrentGameState] = useState<GameState>('PENDING_START_GAME');

    const [gameStateConfigurations, setGameStateConfigurations] = useState<GameStateConfigurations>();

    // starter type
    const [starterType, setStarterType] = useState<StarterTypes>();

    // energy
    const [availableEnergy, setAvailableEnergy] = useState<number>(STARTING_ENERGY);
    const [energyToUse, setEnergyToUse] = useState<number>(1);
    const [energyForSqawn, setEnergyForSqawn] = useState<number>(0);
    const [enegeryForMoves, setEnergyForMoves] = useState<number>(0);

    // spawn pokemon type selection
    // const [showTypeSelectionModal, setShowTypeSelectionModal] = useState<boolean>(false);
    // const [typeToSpawn, setTypeToSpawn] = useState<PokemonType>('Water'); // TODO - change this to something different

    // pokemon preview info
    const [showPokemonPreviewInfo, setShowPokemonPreviewInfo] = useState<boolean>(false);
    const [pokemonPreviewInfo, setPokemonPreviewInfo] = useState<PokemonPreviewInfo>();

    // pokemon to move starting location
    const [originalPokemonCell, setOriginalPokemonCell] = useState<{ row: number, column: number }>();

    /**************************************************************************
     * Input configurations for various states
     *************************************************************************/

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
            onPress={() => onGameActionButtonPress('SELECT_ENERGY_FOR_SPAWN')}
            disabled={availableEnergy === 0}
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
            onPress={() => onGameActionButtonPress('SELECT_ENERGY_FOR_MOVE')}
            disabled={availableEnergy === 0}
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
            onPress={() => onGameActionButtonPress('SELECT_ENERGY_FOR_ATTACK')}
            disabled={availableEnergy === 0}
        />
    );

    const navigationButtons = (nextState: 'SPAWN' | 'SELECT_MOVE_TARGET') => (
        <View key="navigationButtons" style={styles.navigationButtonsSection}>
            <Button
                key="undoButton"
                title="Back"
                type="outline"
                icon={
                    <Icon
                        type='font-awesome-5'
                        name='arrow-alt-circle-left'
                        color='#2089dc'
                        style={styles.actionButtonIcon}
                    />
                }
                buttonStyle={{ width: 120 }}
                onPress={() => onGameActionButtonPress('SELECT_ACTION')}
            />
            <Button
                key="confirmButton"
                title="Confirm"
                iconRight
                icon={
                    <Icon
                        type='font-awesome-5'
                        name='arrow-alt-circle-right'
                        color='white'
                        style={styles.actionButtonIconLeft}
                    />
                }
                disabled={energyToUse === 0}
                buttonStyle={{ backgroundColor: 'green', width: 120 }}
                onPress={() => onGameActionButtonPress(nextState)}
            />
        </View>
    );

    const energySlider = (
        <View key="energySlider" style={{ flex: 1 }}>
            <Text>How much energy do you want to use? [{energyToUse}]</Text>
            <Slider
                value={energyToUse}
                onSlidingComplete={(value) => setEnergyToUse(value)}
                minimumValue={1}
                maximumValue={availableEnergy}
                step={1}
            />
        </View>
    );

    /**************************************************************************
     * Use Effects
     *************************************************************************/

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
        setGameStateConfigurations({
            PENDING_START_GAME: {
                headerText: 'Start or continue?',
                inputs: [], // TODO
            },

            SELECT_ACTION: {
                headerText: 'Select an action',
                inputs: [spawnButton, moveButton, attackButton],
            },

            // Main actions
            // MOVE: {
            //     headerText: 'MOVE',
            //     inputs: [energySlider, navigationButtons],
            // },
            // ATTACK: {
            //     headerText: 'ATTACK',
            //     inputs: [energySlider, navigationButtons],
            // },

            // Follow-up actions for Spawn
            SELECT_ENERGY_FOR_SPAWN: {
                headerText: 'SELECT_ENERGY_FOR_SPAWN',
                inputs: [energySlider, navigationButtons('SPAWN')],
            },
            SPAWN: {
                headerText: 'SPAWN',
                inputs: [],
            },

            // Follow-up actions for Move
            SELECT_ENERGY_FOR_MOVE: {
                headerText: 'SELECT_ENERGY_FOR_MOVE',
                inputs: [energySlider, navigationButtons('SELECT_MOVE_TARGET')],
            },
            SELECT_MOVE_TARGET: {
                headerText: 'SELECT_MOVE_TARGET',
                inputs: [],
            },
            SELECT_MOVE_DESTINATION: {
                headerText: 'SELECT_MOVE_DESTINATION',
                inputs: [],
            },

            // Follow-up actions for Attack
            SELECT_ENERGY_FOR_ATTACK: {
                headerText: 'SELECT_ENERGY_FOR_ATTACK',
                inputs: [],
            },
            SELECT_ATTACK_TARGET: {
                headerText: 'SELECT_ATTACK_TARGET',
                inputs: [],
            },
            SELECT_ATTACK: {
                headerText: 'SELECT_ATTACK',
                inputs: [],
            },

            // Undo - rename to "energy selection"
            UNDO: {
                headerText: '',
                inputs: [],
            },
        });
    }, [previousGameState, currentGameState, energyToUse, availableEnergy, gameBoardData])

    /**************************************************************************
     * Cell-Press Handlers
     *************************************************************************/

    const handleCellPress = useCallback((row: number, column: number) => {
        const cellData = gameBoardData[row][column];

        console.log(`[Game][handleCellPress]
            row: ${row}
            column: ${column}
            currentGameState: ${currentGameState}
            previousGameState: ${previousGameState}
            energyToUse: ${energyToUse}
            availableEnergy: ${availableEnergy}
        `);

        if (currentGameState === 'SELECT_MOVE_TARGET' && cellData.pokemonData) {
            setGameBoardData(produce(gameBoardData, (draft) => {
                draft[row][column].isMoveTarget = true;

                for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
                    for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
                        const cell = draft[i][j];
                        if (!cell.pokemonData) {
                            if ((i-1 === row && j-1 === column) || (i+1 === row && j+1 === column) || (i+1 === row && j-1 === column) || (i-1 === row && j+1 === column) || (i === row && j+1 === column) || (i === row && j-1 === column) || (i+1 === row && j === column) || (i-1 === row && j === column)) {
                                cell.isPotentialMoveDestination = true;
                            }
                        }
                    }
                }
            }));
            setOriginalPokemonCell({ row: row, column: column});
            setPreviousGameState('SELECT_MOVE_TARGET');
            setCurrentGameState('SELECT_MOVE_DESTINATION');
        } else if (currentGameState === 'SELECT_MOVE_DESTINATION' && cellData.isPotentialMoveDestination && originalPokemonCell) {

            const pokemonData: PokemonData = JSON.parse(
                JSON.stringify(
                    gameBoardData[originalPokemonCell.row][originalPokemonCell.column].pokemonData));

            setGameBoardData(produce(gameBoardData, (draft) => {
                draft[row][column].pokemonData = pokemonData;
                draft[row][column].ownedByType = pokemonData.type_1 as StarterTypes;
                draft[originalPokemonCell.row][originalPokemonCell.column].pokemonData = undefined;
                for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
                    for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
                        gameBoardData[i][j].isMoveTarget = false;
                        gameBoardData[i][j].isPotentialMoveDestination = false;
                    }
                }
            }));

            const updatedEnergy = energyToUse - 1;
            if (updatedEnergy === 0) {
                setPreviousGameState('SELECT_MOVE_DESTINATION');
                setCurrentGameState('SELECT_ACTION');
                setEnergyToUse(1);
            } else {
                setPreviousGameState('SELECT_MOVE_DESTINATION');
                setCurrentGameState('SELECT_MOVE_TARGET');
                setEnergyToUse(updatedEnergy);
            }
        }

        // } else if (cellData.isPotentialMoveDestination && executableGameAction === 'MOVE') {
        //     console.log(`[Game][handleCellPress] - PRESS MOVE POKEMON HERE
        //         originalPokemonCell: ${JSON.stringify(originalPokemonCell)}
        //     `);

        //     // TODO - this part is not working...................................

        //     setGameBoardData(produce(gameBoardData, draft => {
        //         for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
        //             for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
        //                 draft[i][j].isPotentialMoveDestination = false;
        //             }
        //         }
        //         if (originalPokemonCell && originalPokemonCell.row && originalPokemonCell.column) {
        //             draft[row][column].pokemonData = JSON.parse(JSON.stringify(draft[originalPokemonCell.row][originalPokemonCell.column].pokemonData));
        //             draft[originalPokemonCell.row][originalPokemonCell.column].pokemonData = undefined;
        //             console.log(`[Game][handleCellPress][resetting...]`)
        //         }
        //     }));

        //     console.log(`[Game][handleCellPress] - updated gameboard data!`);

        //     setOriginalPokemonCell({ row: 0, column: 0});

        //     const newEnergyForMoves = enegeryForMoves - 1;
        //     setEnergyForMoves(newEnergyForMoves);

        //     if (enegeryForMoves > 0) {
        //         setGameBoardData(produce(gameBoardData,(draft) => {
        //             draft[row][column].isPotentialMove = true;
        //         }));
        //     }
        //     console.log(`[Game][handleCellPress] - newEnergyForMoves=${newEnergyForMoves}`)
        // } else if (cellData.pokemonData) {
        //     console.log(`[Game][handleCellPress] - CLICK POKEMON PREVIEW`);
        //     setShowPokemonPreviewInfo(true);
        //     setPokemonPreviewInfo({ pokemonData: cellData.pokemonData });
        // }
    }, [currentGameState, previousGameState, energyToUse, availableEnergy, gameBoardData, originalPokemonCell, enegeryForMoves]);


    const handleCellLongPress = (row: number, column: number) => {
        console.log(`[Game][handleCellLongPress]
            row: ${row}
            column: ${column}
        `);

        const cellData = gameBoardData[row][column];

        if (cellData.pokemonData) {
            setPokemonPreviewInfo({ pokemonData: cellData.pokemonData });
            setShowPokemonPreviewInfo(true);
        }
    }

    const onGameActionButtonPress = useCallback((newGameState: GameState) => {
        console.log(`[Game][onGameActionButtonPress]
            newGameState: ${newGameState}
        `);

        if (newGameState === 'SELECT_ACTION') {
            setPreviousGameState('PENDING_START_GAME');
            setCurrentGameState('SELECT_ACTION');
        } else if (newGameState === 'SELECT_ENERGY_FOR_SPAWN') {
            setPreviousGameState('SELECT_ACTION');
            setCurrentGameState('SELECT_ENERGY_FOR_SPAWN');
        } else if (newGameState === 'SPAWN') {
            setPreviousGameState('SELECT_ENERGY_FOR_SPAWN');
            setCurrentGameState('SPAWN');
            executeAction('SPAWN');
        } else if (newGameState === 'SELECT_ENERGY_FOR_MOVE') {
            setPreviousGameState('SELECT_ACTION');
            setCurrentGameState('SELECT_ENERGY_FOR_MOVE');
        } else if (newGameState === 'SELECT_MOVE_TARGET') {
            setPreviousGameState('SELECT_ENERGY_FOR_MOVE');
            setCurrentGameState('SELECT_MOVE_TARGET');
        }
    }, [currentGameState, previousGameState, availableEnergy, energyToUse]);

    const executeAction = useCallback((newGameState: GameState) => {
        console.log(`[Game][executeAction]
            newGameState=${newGameState}
            energyToUse: ${energyToUse}
        `);

        if (newGameState === 'SPAWN') {
            const potentialSpawnCells: Set<{ row: number, col: number }> = new Set<{ row: number, col: number }>();

            while (potentialSpawnCells.size < energyToUse) {
                const row = Math.floor(Math.random() * GAMEBOARD_NUM_ROWS);
                const col = Math.floor(Math.random() * GAMEBOARD_NUM_COLS);

                console.log(`[Game][executeAction] - spawning...
                    row: ${row}
                    col: ${col}
                `);
                if (!gameBoardData[row][col].pokemonData && !gameBoardData[row][col].ownedByType) {
                    potentialSpawnCells.add({ row, col });
                }
            }

            console.log(`[Game][executeAction] - spawning...
                potentialSpawnCells: ${potentialSpawnCells.size}
            `);

            setGameBoardData(produce(gameBoardData, (draft) => {
                potentialSpawnCells.forEach((spawn) => {
                    const pokemonData: PokemonData = getRandomStarterForType(starterType!);
                    console.log(`[Game][executeAction]
                        currentGameState: ${currentGameState}
                        pokemon: ${pokemonData.name}
                        row: ${spawn.row}
                        col: ${spawn.col}
                    `);
                    draft[spawn.row][spawn.col].pokemonData = pokemonData;
                    draft[spawn.row][spawn.col].ownedByType = pokemonData.type_1 as StarterTypes;
                });
            }));

            setAvailableEnergy(availableEnergy - energyToUse);
            setEnergyToUse(1);
            setCurrentGameState('SELECT_ACTION');
            setPreviousGameState('SPAWN');
        } 
    }, [currentGameState, previousGameState, gameBoardData, availableEnergy, energyToUse, originalPokemonCell])

    const onSelectStarterType = (type: 'Grass' | 'Fire' | 'Water') => {
        console.log(`[Game][onSelectStarterType]
            type: ${type}
        `);
        setStarterType(type);
    }

    /**************************************************************************
     * Render methods
     *************************************************************************/

    const renderPokemonImage = (pokemonSprite: string) => {
        if (!pokemonSprite) return null;

        return (
            <Image
                style={{
                    resizeMode: 'stretch',
                    height: CELL_SIZE - 1,
                    width: CELL_SIZE - 1,
                }}
                source={{ uri: pokemonSprite }}
            />
        );
    }

    const renderCell = (rowIndex: number, columnIndex: number) => {
        const cellData: GameboardCellData | null = 
            gameBoardData && gameBoardData[rowIndex] && gameBoardData[rowIndex][columnIndex] ? 
                gameBoardData[rowIndex][columnIndex] :
                null;

        if (!cellData) {
            return null;
        }

        let cellColor = 'white';
        if (cellData.isMoveTarget) {
            cellColor = 'yellow';
        } else if (cellData.isPotentialMoveDestination) {
            cellColor = 'yellow';
        } else if (cellData.ownedByType) {
            cellColor = COLOR_BY_TYPE[cellData.ownedByType];
        }

        const cellStyle = {
            ...styles.cell,
            minWidth: CELL_SIZE,
            maxWidth: CELL_SIZE,
            minHeight: CELL_SIZE,
            maxHeight: CELL_SIZE,
            borderColor: 'lightgrey',
            borderRightWidth: columnIndex + 1 === GAMEBOARD_NUM_COLS ? 1 : 0,
            borderBottomWidth: rowIndex + 1 === GAMEBOARD_NUM_ROWS ? 1 : 0,
            backgroundColor: cellColor,
        }

        return (
            <TouchableOpacity
                key={`row_${rowIndex}_col_${columnIndex}`}
                style={cellStyle}
                onPress={() => handleCellPress(rowIndex, columnIndex)}
                onLongPress={() => handleCellLongPress(rowIndex, columnIndex)}
            >
                { renderPokemonImage(cellData.pokemonData?.sprite_url || '')}
            </TouchableOpacity>
        );
    }

    const renderTopSection = () => {
        if (currentGameState && gameStateConfigurations && gameStateConfigurations[currentGameState]) {
            return (
                <View style={styles.topSection}>
                    <Text>{gameStateConfigurations[currentGameState].headerText}</Text>
                    <View style={styles.statsSection}>
                        <View>
                            <Text>Available Energy</Text>
                            <Text>{availableEnergy}</Text>
                        </View>
                        <View style={styles.statsSeparator} />
                        <View>
                            <Text>TODO</Text>
                            <Text>TODO</Text>
                        </View>
                        <View style={styles.statsSeparator} />
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
        if (currentGameState && gameStateConfigurations && gameStateConfigurations[currentGameState]) {
            return (
                <View style={styles.bottomSection}>
                    <View style={styles.actionsButtons}>
                        {gameStateConfigurations[currentGameState].inputs}
                    </View>
                </View>
            );
        }
    }

    const renderPokemonPreviewInfo = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPokemonPreviewInfo}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeaderText}>{pokemonPreviewInfo?.pokemonData.name}</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={() => {
                                setShowPokemonPreviewInfo(false);
                                setPokemonPreviewInfo(undefined);
                            }}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }

    const renderGameboard = () => {
        return (
            Array.from(Array(GAMEBOARD_NUM_ROWS).keys()).map(rowIndex => (
                <View key={`row_${rowIndex}`} style={[styles.row, { maxHeight: CELL_SIZE, minHeight: CELL_SIZE }]}>
                    {
                        Array.from(Array(GAMEBOARD_NUM_COLS).keys()).map(columnIndex => renderCell(rowIndex, columnIndex,))
                    }
                </View>
            ))
        );
    }

    const renderStartGameAndStarterTypeSelection = () => {
        console.log(`[Game][renderStartGameAndStarterTypeSelection]
            starterType: ${starterType}
        `);
        return (
            <View style={styles.startGameAndStartTypeSection}>
                <View style={styles.selectTypeForm}>
                    <Text style={styles.starterTypeHeaderText}>Select a starter type</Text>
                    <View style={styles.selectTypeColorRow}>
                        <View style={{ opacity: starterType === 'Grass' ? 1 : 0.5 }}>
                            <TouchableOpacity
                                style={[styles.selectTypeOneColor, { backgroundColor: '#7c5' }]}
                                onPress={() => onSelectStarterType('Grass')}
                            >
                                <Text style={styles.starterTypeText}>Grass</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ opacity: starterType === 'Fire' ? 1 : 0.5 }}>
                            <TouchableOpacity
                                style={[styles.selectTypeOneColor, { backgroundColor: '#f42' }]}
                                onPress={() => onSelectStarterType('Fire')}
                            >
                                <Text style={styles.starterTypeText}>Fire</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ opacity: starterType === 'Water' ? 1 : 0.5 }}>
                            <TouchableOpacity
                                style={[styles.selectTypeOneColor, { backgroundColor: '#39f' }]}
                                onPress={() => onSelectStarterType('Water')}
                            >
                                <Text style={styles.starterTypeText}>Water</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Button
                    key="startGameButton"
                    title="Start Game"
                    icon={
                        <Icon
                            type='font-awesome-5'
                            name='play-circle'
                            color='white'
                            style={styles.actionButtonIcon}
                        />
                    }
                    buttonStyle={{ backgroundColor: 'green' }}
                    onPress={() => onGameActionButtonPress('SELECT_ACTION')}
                    disabled={!starterType}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {
                currentGameState === 'PENDING_START_GAME' ?
                    <View>
                        {renderStartGameAndStarterTypeSelection()}
                    </View> :
                    <View style={styles.container}>
                        {renderTopSection()}
                        {renderGameboard()}
                        {renderBottomSection()}
                        {renderPokemonPreviewInfo()}
                    </View>
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
    actionButtonIconLeft: {
        marginLeft: 10,
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
        justifyContent: 'center',
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
    },
    navigationButtonsSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // borderColor: 'black',
        // borderWidth: 1,
    },
    // from modal doc
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        marginTop: 10,
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalHeaderText: {
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    startGameButtonContainer: {
        paddingHorizontal: 20
    },
    selectTypeForm: {
        flex: 1,
        flexDirection: 'column',
        height: 60
    },
    selectTypeColorRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectTypeOneColor: {
        borderRadius: 4,
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    starterTypeHeaderText: {
        marginBottom: 20,
        fontSize: 20,
    },
    starterTypeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    startGameAndStartTypeSection: {
        height: 150,
        paddingHorizontal: 20
    }
});