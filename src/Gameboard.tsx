import React from 'react';
import { Dimensions, Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { get } from 'lodash';

import { PokemonData } from './Pokemon';
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
        this.allowPress = false,
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
    endZoneData,
    onCellPress,
    onCellLongPress
}: {
    numRows: number,
    numCols: number,
    gameBoardData: GameboardCellData[][],
    endZoneData: GameboardCellData[],
    onCellPress: any,
    onCellLongPress: any
}) => {

    const cellWidth: number = (WIDTH - (CELL_MARGIN_WIDTH * numCols * 2) - (CELL_BORDER_WIDTH * numCols * 2)) / numCols;

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

    const renderEndZone = () => {
        return (
            <View style={[styles.endZoneCell, { minHeight: cellWidth, maxHeight: cellWidth }]}>
                { endZoneData.map(pokemon => renderPokemonImage(get(pokemon, 'pokemonSprite', '')))}
            </View>
        );
    }

    const renderCell = (rowIndex: number, columnIndex: number) => {
        const cellData: GameboardCellData = gameBoardData && gameBoardData[rowIndex] && gameBoardData[rowIndex][columnIndex] || new GameboardCellData();
        const borderColor: string = cellData ? (cellData.isPressed ? 'green' : (cellData.isLongPressed ? 'blue' : 'gray')) : 'gray';

        return (
            <TouchableOpacity
                key={`row_${rowIndex}_col_${columnIndex}`}
                style={[styles.cell, { minWidth: cellWidth, maxWidth: cellWidth, minHeight: cellWidth, maxHeight: cellWidth, borderColor }]}
                onPress={() => cellData.allowPress && onCellPress(rowIndex, columnIndex)}
                onLongPress={() => cellData.allowLongPress && onCellLongPress(rowIndex, columnIndex)}
            >
                { renderPokemonImage(cellData.pokemonSprite || '')}
            </TouchableOpacity>
        );
    }

    const renderGameControls = () => {
        return (
            <View style={styles.gameControlsCell}>

            </View>
        );
    }

    return (
        <View style={styles.container}>
            {
                renderEndZone()
            }
            {
                Array.from(Array(numRows).keys()).map(rowIndex => (
                    <View key={`row_${rowIndex}`} style={[styles.row, { maxHeight: cellWidth }]}>
                        {
                            Array.from(Array(numCols).keys()).map(columnIndex => renderCell(rowIndex, columnIndex,))
                        }
                    </View>
                ))
            }
            {
                renderGameControls()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: CELL_MARGIN_WIDTH,
        marginBottom: CELL_MARGIN_WIDTH,
    },
    cell: {
        flex: 1,
        borderRadius: 5,
        borderWidth: CELL_BORDER_WIDTH,
        marginLeft: CELL_MARGIN_WIDTH,
        marginRight: CELL_MARGIN_WIDTH,
    },
    endZoneCell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: CELL_BORDER_WIDTH,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 25,
    },
    gameControlsCell : {
        flex: 1,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: CELL_BORDER_WIDTH,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
    }
});

export default Gameboard;