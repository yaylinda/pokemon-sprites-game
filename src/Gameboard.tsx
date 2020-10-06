import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { get } from 'lodash';

import { PokemonData } from './Pokemon';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const CELL_MARGIN_WIDTH = 4;
const CELL_BORDER_WIDTH = 1;

export class GameboardCellData {
    isPressed: boolean;
    isLongPressed: boolean;
    pokemonData?: PokemonData;
    pokemonSprite?: string;

    constructor(
        isPressed?: boolean,
        isLongPressed?: boolean,
        pokemonData?: PokemonData,
        pokemonSprite?: string) {
        this.isPressed = isPressed || false;
        this.isLongPressed = isLongPressed || false;
        this.pokemonData = pokemonData;
        this.pokemonSprite = pokemonSprite;
    }
}

const Gameboard = ({ size, data, onCellPress, onCellLongPress }: { size: number, data: GameboardCellData[][], onCellPress: any, onCellLongPress: any }) => {

    const cellWidth: number = (WIDTH - (CELL_MARGIN_WIDTH * size * 2) - (CELL_BORDER_WIDTH * size * 2)) / size;

    console.log(`[Gameboard]
        cellWidth: ${cellWidth}
    `);

    const renderPokemonImage = (pokemonSprite: string) => {
        if (!pokemonSprite) return null;

        console.log(`[Gameboard][renderPokemonImage]
            pokemonSprite: ${pokemonSprite}
        `);

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

        console.log(`[Gameboard][renderCell]
            rowIndex: ${rowIndex}
            columnIndex: ${columnIndex}
        `);

        const cellData: GameboardCellData = data && data[rowIndex] && data[rowIndex][columnIndex] || new GameboardCellData();
        const borderColor: string = cellData ? (cellData.isPressed ? 'green' : (cellData.isLongPressed ? 'blue' : 'gray')) : 'gray';

        return (
            <TouchableOpacity
                key={`row_${rowIndex}_col_${columnIndex}`}
                style={[styles.cell, { minWidth: cellWidth, maxWidth: cellWidth, minHeight: cellWidth, maxHeight: cellWidth, borderColor }]}
                onPress={() => onCellPress(rowIndex, columnIndex)}
                onLongPress={() => onCellLongPress(rowIndex, columnIndex)}
            >
                { renderPokemonImage(cellData.pokemonSprite || '')}
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {
                Array.from(Array(size).keys()).map(rowIndex => (
                    <View key={`row_${rowIndex}`} style={[styles.row, { maxHeight: cellWidth }]}>
                        {
                            Array.from(Array(size).keys()).map(columnIndex => renderCell(rowIndex, columnIndex,))
                        }
                    </View>
                ))
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
        marginLeft: CELL_MARGIN_WIDTH,
        marginRight: CELL_MARGIN_WIDTH,
        borderRadius: 5,
        borderWidth: CELL_BORDER_WIDTH,
    }
});

export default Gameboard;