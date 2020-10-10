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

    pokemonData?: PokemonData;
    pokemonSprite?: string;

    constructor(pokemonData?: PokemonData, pokemonSprite?: string) {
        this.allowPress = false;
        this.allowLongPress = false;
        this.isPressed = false;
        this.isLongPressed = false;
        this.pokemonData = pokemonData;
        this.pokemonSprite = pokemonSprite;
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
}: {
    numRows: number,
    numCols: number,
    gameBoardData: GameboardCellData[][],
    gameState: GameState,
    onCellPress: any,
    onCellLongPress: any,
    gameStateActions?: GameStateActions,
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
                    }]}
                onPress={() => cellData.allowPress && onCellPress(rowIndex, columnIndex)}
                onLongPress={() => cellData.allowLongPress && onCellLongPress(rowIndex, columnIndex)}
            >
                { renderPokemonImage(cellData.pokemonSprite || '')}
            </TouchableOpacity>
        );
    }

    const renderBottomSection = () => {
        if (gameState && gameStateActions && gameStateActions[gameState]) {
            return (
                <View style={styles.bottomSection}>
                    <View style={styles.actionsHeader}>
                        <Text>{gameStateActions[gameState].headerText}</Text>
                    </View>
                    <View style={styles.actionsButtons}>
                        {gameStateActions[gameState].buttons}
                    </View>
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
            </View>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 25,
    },
    bottomSection: {
        flex: 4,
        flexDirection: 'column',
        alignSelf: 'stretch',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    actionsHeader: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionsButtons: {
        flexDirection: 'column',
        justifyContent: 'center',
    }
});

export default Gameboard;