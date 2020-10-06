import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Gameboard, { GameboardCellData } from './Gameboard';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

export default function Game() {

    const [gameboardData, setGameboardData] = useState<GameboardCellData[][]>([]);
    
    const onCellPress = (row: number, column: number) => {
        console.log(`[Game][onCellPress]
            row: ${row}
            column: ${column}
        `);
    }

    const onCellLongPress = (row: number, column: number) => {
        console.log(`[Game][onCellLongPress]
            row: ${row}
            column: ${column}
        `);
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <View style={styles.body}>
                <Gameboard 
                    size={10} 
                    data={gameboardData} 
                    onCellPress={(row: number, cell: number) => onCellPress(row, cell)}
                    onCellLongPress={(row: number, cell: number) => onCellLongPress(row, cell)}
                />
            </View>
            <View style={styles.footer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%'
    },
    header: {
        flex: 1,
        maxHeight: HEIGHT * 0.2,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    body: {
        flex: 1,
    },
    footer: {
        flex: 1,
        maxHeight: HEIGHT * 0.2,
        borderTopColor: 'gray',
        borderTopWidth: 1,
    },
});