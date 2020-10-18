import { Picker } from '@react-native-community/picker';
import { produce } from 'immer';
import { set } from 'immer/dist/internal';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Slider } from 'react-native-elements';
import { getPokemonByStrengthAndType, PokemonData, PokemonType } from './Pokemon';

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

class GameboardCellData {
    isPressed: boolean;
    isLongPressed: boolean;
    isPotentialSpawn: boolean;
    isPotentialMove: boolean;
    isPotentialMoveDestination: boolean;
    pokemonData?: PokemonData;

    constructor() {
        this.isPressed = false;
        this.isLongPressed = false;
        this.isPotentialSpawn = false;
        this.isPotentialMove = false;
        this.isPotentialMoveDestination = false;
        this.pokemonData = undefined;
    }
}

type GameState = 'SELECT_ACTION' | SelectedGameAction;
type ExecutableGameAction = 'SPAWN' | 'MOVE' | 'ATTACK';
type FollowUpGameAction = 'DO_SPAWN' | 'DO_MOVE' | 'DO_ATTACK';
type SelectedGameAction = ExecutableGameAction | FollowUpGameAction | 'UNDO';
type GameStateActions = { [gameState in GameState]: { headerText: string, buttons: any[] } };

type PokemonPreviewInfo = {
    pokemonData: PokemonData;
}

const nextAction: { [currentAction in ExecutableGameAction]: FollowUpGameAction } = {
    SPAWN: 'DO_SPAWN',
    MOVE: 'DO_MOVE',
    ATTACK: 'DO_ATTACK',
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
    const [gameStateActions, setGameStateActions] = useState<GameStateActions>();

    const [gameState, setGameState] = useState<GameState>('SELECT_ACTION');
    const [executableGameAction, setExecutableGameAction] = useState<ExecutableGameAction>('ATTACK');

    // energy
    const [availableEnergy, setAvailableEnergy] = useState<number>(STARTING_ENERGY);
    const [energyToUse, setEnergyToUse] = useState<number>(1);
    const [enegeryForMoves, setEnergyForMoves] = useState<number>(0);

    // spawn pokemon type selection
    const [showTypeSelectionModal, setShowTypeSelectionModal] = useState<boolean>(false);
    const [typeToSpawn, setTypeToSpawn] = useState<PokemonType>('Water'); // TODO - change this to something different

    // pokemon preview info
    const [showPokemonPreviewInfo, setShowPokemonPreviewInfo] = useState<boolean>(false);
    const [pokemonPreviewInfo, setPokemonPreviewInfo] = useState<PokemonPreviewInfo>();

    // pokemon to move starting location
    const [originalPokemonCell, setOriginalPokemonCell] = useState<{row: number, column: number}>();

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
            onPress={() => onGameActionButtonPress('MOVE')}
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
            onPress={() => onGameActionButtonPress('ATTACK')}
            disabled={availableEnergy === 0}
        />
    );

    const navigationButtons = (
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
                onPress={() => onGameActionButtonPress('UNDO')}
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
                onPress={() => onGameActionButtonPress(nextAction[executableGameAction])}
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

    const pokemonType = (
        // TODO - later, build out modal and picker to allow user to pick the ype
        <View key="pokemonType" style={{ flex: 1 }}>
            <Button
                key="selectPokemonTypeButton"
                title={`Type: ${typeToSpawn}`}
                type="clear"
                icon={
                    <Icon
                        type='font-awesome-5'
                        name='question-circle'
                        color='#2089dc'
                        style={styles.actionButtonIcon}
                    />
                }
                onPress={() => setShowTypeSelectionModal(true)}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showTypeSelectionModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeaderText}>Select a type to spawn?</Text>
                        <Picker
                            style={{ width: 200 }}
                            selectedValue={typeToSpawn}
                            onValueChange={(value, index) => setTypeToSpawn(value as PokemonType)}
                        >
                            <Picker.Item label="Grass" value="Grass" />
                            <Picker.Item label="Poison" value="Poison" />
                            <Picker.Item label="Water" value="Water" />
                            <Picker.Item label="Fire" value="Fire" />
                            <Picker.Item label="Flying" value="Flying" />
                            <Picker.Item label="Bug" value="Bug" />
                            <Picker.Item label="Ice" value="Ice" />
                            <Picker.Item label="Normal" value="Normal" />
                            <Picker.Item label="Electric" value="Electric" />
                            <Picker.Item label="Ground" value="Ground" />
                            <Picker.Item label="Fairy" value="Fairy" />
                            <Picker.Item label="Dragon" value="Dragon" />
                            <Picker.Item label="Psychic" value="Psychic" />
                            <Picker.Item label="Rock" value="Rock" />
                            <Picker.Item label="Fighting" value="Fighting" />
                            <Picker.Item label="Steel" value="Steel" />
                            <Picker.Item label="Ghost" value="Ghost" />
                        </Picker>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={() => {
                                setShowTypeSelectionModal(false);
                            }}>
                            <Text style={styles.modalButtonText}>Select</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );

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
                buttons: [energySlider, pokemonType, navigationButtons],
            },
            DO_SPAWN: {
                headerText: 'DO SPAWN',
                buttons: [],
            },
            MOVE: {
                headerText: 'MOVE',
                buttons: [energySlider, navigationButtons],
            },
            DO_MOVE: {
                headerText: 'DO MOVE',
                buttons: [],
            },
            ATTACK: {
                headerText: 'ATTACK',
                buttons: [energySlider, navigationButtons],
            },
            DO_ATTACK: {
                headerText: 'DO ATTACK',
                buttons: [],
            },
            UNDO: { // Rename to energy selection
                headerText: '',
                buttons: [],
            },
        });
    }, [executableGameAction, typeToSpawn, energyToUse, availableEnergy, gameBoardData, showTypeSelectionModal])

    const handleCellPress = useCallback((row: number, column: number) => {
        const cellData = gameBoardData[row][column];

        console.log(`[Game][handleCellPress]
            row: ${row}
            column: ${column}
            executableGameAction: ${executableGameAction}
            typeToSpawn: ${typeToSpawn}
            energyToUse: ${energyToUse}
            availableEnergy: ${availableEnergy}
            cellData: ${JSON.stringify(cellData)}
        `);

        if (cellData.isPotentialSpawn && executableGameAction === 'SPAWN') {
            console.log(`[Game][handleCellPress] - SPAWNING NEW POKEMON`);
            const pokemon: PokemonData = getPokemonByStrengthAndType(energyToUse, MAX_ENERGY, typeToSpawn);

            console.log(`[Game][handleCellPress] - spawned ${pokemon.name}`);

            setGameBoardData(produce(gameBoardData, draft => {
                draft[row][column].pokemonData = pokemon;
                for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
                    for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
                        draft[i][j].isPotentialSpawn = false;
                    }
                }
            }));

            setGameState('SELECT_ACTION');
            // setAvailableEnergy(availableEnergy + 1);
            setEnergyToUse(1);
            // this means the end of one turn. so now it's is time for the opposition. it won't be a second player, or an autoplayer. 
            // it will just be obsticles like covers, etc.the goal awalk aound the space of the board. spawn, and must go to respqned plaws to get it to join team.
            // team as a whole will battle or attack the things thave comes up on the board when you amake your action actions. so the basiaclly just fight all of them
            // try to step on each square
        } else if (cellData.isPotentialMove && executableGameAction === 'MOVE') {
            console.log(`[Game][handleCellPress] - PRESS POKEMON TO MOVE`);
            setGameBoardData(produce(gameBoardData, draft => {
                draft[row][column].isPotentialMove = false;
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

        } else if (cellData.isPotentialMoveDestination && executableGameAction === 'MOVE') {
            console.log(`[Game][handleCellPress] - PRESS MOVE POKEMON HERE
                originalPokemonCell: ${JSON.stringify(originalPokemonCell)}
            `);

            // TODO - this part is not working...................................

            setGameBoardData(produce(gameBoardData, draft => {
                for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
                    for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
                        draft[i][j].isPotentialMoveDestination = false;
                    }
                }
                if (originalPokemonCell && originalPokemonCell.row && originalPokemonCell.column) {
                    draft[row][column].pokemonData = JSON.parse(JSON.stringify(draft[originalPokemonCell.row][originalPokemonCell.column].pokemonData));
                    draft[originalPokemonCell.row][originalPokemonCell.column].pokemonData = undefined;
                    console.log(`[Game][handleCellPress][resetting...]`)
                }
            }));

            console.log(`[Game][handleCellPress] - updated gameboard data!`);

            setOriginalPokemonCell({ row: 0, column: 0});

            const newEnergyForMoves = enegeryForMoves - 1;
            setEnergyForMoves(newEnergyForMoves);

            if (enegeryForMoves > 0) {
                setGameBoardData(produce(gameBoardData,(draft) => {
                    draft[row][column].isPotentialMove = true;
                }));
            }
            console.log(`[Game][handleCellPress] - newEnergyForMoves=${newEnergyForMoves}`)
        } else if (cellData.pokemonData) {
            console.log(`[Game][handleCellPress] - CLICK POKEMON PREVIEW`);
            setShowPokemonPreviewInfo(true);
            setPokemonPreviewInfo({ pokemonData: cellData.pokemonData });
        }
    }, [executableGameAction, typeToSpawn, energyToUse, availableEnergy, gameBoardData, originalPokemonCell, enegeryForMoves]);


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
        } else if (['DO_SPAWN', 'DO_MOVE', 'DO_ATTACK'].includes(action)) {
            console.log(`[Game][onGameActionButtonPress][action=confirm]
                executableGameAction: ${executableGameAction}
                energyToUse: ${energyToUse}
                availableEnergy: ${availableEnergy}
            `);
            setAvailableEnergy(availableEnergy - energyToUse);
            setGameState(action);
            executeAction();
        } else { // UNDO
            setGameState('SELECT_ACTION');
        }
    }, [executableGameAction, availableEnergy, energyToUse]);

    const executeAction = useCallback(() => {
        console.log(`[Game][executeAction][action=${executableGameAction}]
            energyToUse: ${energyToUse}
        `);

        // this is use to count down how many moves we could do
        setEnergyForMoves(energyToUse);

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
            potentialSpawnCells: ${potentialSpawnCells.size}
            `);

            setGameBoardData(produce(gameBoardData, (draft) => {
                potentialSpawnCells.forEach((spawn) => {
                    draft[spawn.row][spawn.col].isPotentialSpawn = true;
                });
            }));
        } else if (executableGameAction === 'MOVE') {
            setGameBoardData(produce(gameBoardData, (draft) => {
                for (let i = 0; i < GAMEBOARD_NUM_ROWS; i++) {
                    for (let j = 0; j < GAMEBOARD_NUM_COLS; j++) {
                        if (draft[i][j].pokemonData) {
                            draft[i][j].isPotentialMove = true;
                        }
                    }
                }
            }));
        } else if (executableGameAction === 'ATTACK') {

        } else {

        }
    }, [executableGameAction, gameBoardData, availableEnergy, energyToUse, originalPokemonCell])

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
                        backgroundColor: cellData.isPotentialSpawn ? 'lightgreen' : (cellData.isPotentialMove || cellData.isPotentialMoveDestination ? 'lightblue' : 'white'),
                    }]}
                onPress={() => handleCellPress(rowIndex, columnIndex)}
                onLongPress={() => handleCellLongPress(rowIndex, columnIndex)}
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
                            }}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
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
            {
                renderPokemonPreviewInfo()
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
});