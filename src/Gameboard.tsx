import React from 'react';
import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PokemonData } from './Pokemon';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const CELL_MARGIN_WIDTH = 4;
const CELL_BORDER_WIDTH = 1;

export type GameboardCellData = {
    isPressed: boolean,
    isLongPressed: boolean,
    pokemonData?: PokemonData,
    pokemonSprite?: string,
}

const Gameboard = ({size, data, onCellPress, onCellLongPress}: { size: number, data: GameboardCellData[][], onCellPress: any, onCellLongPress: any}) => {

    const cellWidth: number = (WIDTH - (CELL_MARGIN_WIDTH * size * 2) - (CELL_BORDER_WIDTH * size * 2)) / size;
    console.log(`[Gameboard]
        cellWidth: ${cellWidth}
    `);

    return (
        <View style={styles.container}>
            {
                Array.from(Array(size).keys()).map(rowIndex => (
                    <View key={`row_${rowIndex}`} style={[styles.row, { maxHeight: cellWidth }]}>
                        {
                            Array.from(Array(size).keys()).map(columnIndex => (
                                <TouchableOpacity 
                                    key={`row_${rowIndex}_col_${columnIndex}`} 
                                    style={[styles.cell, { minWidth: cellWidth, maxWidth: cellWidth, minHeight: cellWidth, maxHeight: cellWidth }]} 
                                    onPress={() => onCellPress(rowIndex, columnIndex)} 
                                    onLongPress={() => onCellLongPress(rowIndex, columnIndex)}>
            
                                </TouchableOpacity>
                            ))
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
        borderColor: 'gray',
        borderWidth: CELL_BORDER_WIDTH,
    }
});

export default Gameboard;