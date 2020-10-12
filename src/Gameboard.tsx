import React from 'react';
import { Dimensions, Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { get } from 'lodash';

import { PokemonData } from './Pokemon';
import { GameState, GameStateActions } from './Game';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const CELL_MARGIN_WIDTH = 4;
const CELL_BORDER_WIDTH = 1;

export class GameboardCellData {
    allowPress: boolean;
    allowLongPress: boolean;
    isPressed: boolean;
    isLongPressed: boolean;
    isPotentialSpawn: boolean;
    pokemonData?: PokemonData;

    constructor(pokemonData?: PokemonData) {
        this.allowPress = false;
        this.allowLongPress = false;
        this.isPressed = false;
        this.isLongPressed = false;
        this.isPotentialSpawn = false;
        this.pokemonData = pokemonData;
    }
}

const Gameboard = ({
    numRows,
    numCols,
    gameBoardData,
    gameState,
    onCellPress,
    onCellLongPress,
    gameStateActions,
    availableEnergy,
}: {
    numRows: number,
    numCols: number,
    gameBoardData: GameboardCellData[][],
    gameState: GameState,
    onCellPress: any,
    onCellLongPress: any,
    gameStateActions?: GameStateActions,
    availableEnergy: number,
}) => {

    // const cellWidth: number = (WIDTH - (CELL_MARGIN_WIDTH * numCols * 2) - (CELL_BORDER_WIDTH * numCols * 2)) / numCols;
    const cellWidth: number = (WIDTH - (CELL_BORDER_WIDTH * numCols * 2)) / numCols;

    const renderPokemonImage = (pokemonSprite: string) => {
        if (!pokemonSprite) return null;

        return (
            <Image
                style={{
                    resizeMode: 'cover',
                    height: cellWidth - 2,
                    width: cellWidth - 2,
                }}
                source={{ uri: pokemonSprite }}
            />
        );
    }

    const renderCell = (rowIndex: number, columnIndex: number) => {
        const cellData: GameboardCellData = gameBoardData && gameBoardData[rowIndex] && gameBoardData[rowIndex][columnIndex] || new GameboardCellData();
        // const borderColor: string = cellData ? (cellData.isPressed ? 'green' : (cellData.isLongPressed ? 'blue' : 'gray')) : 'gray';

        return (
            <TouchableOpacity
                key={`row_${rowIndex}_col_${columnIndex}`}
                style={[
                    styles.cell, {
                        minWidth: cellWidth,
                        maxWidth: cellWidth,
                        minHeight: cellWidth,
                        maxHeight: cellWidth,
                        borderColor: 'lightgrey',
                        borderRightWidth: columnIndex + 1 === numCols ? 1 : 0,
                        borderBottomWidth: rowIndex + 1 === numRows ? 1 : 0,
                        backgroundColor: cellData.isPotentialSpawn ? 'lightgreen' : 'white',
                    }]}
                onPress={() => cellData.allowPress && onCellPress(rowIndex, columnIndex)}
                onLongPress={() => cellData.allowLongPress && onCellLongPress(rowIndex, columnIndex)}
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
                Array.from(Array(numRows).keys()).map(rowIndex => (
                    <View key={`row_${rowIndex}`} style={[styles.row, { maxHeight: cellWidth, minHeight: cellWidth }]}>
                        {
                            Array.from(Array(numCols).keys()).map(columnIndex => renderCell(rowIndex, columnIndex,))
                        }
                    </View>
                ))
            }
            {
                renderBottomSection()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
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

export default Gameboard;