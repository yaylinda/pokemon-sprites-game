import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const Gameboard = ({size, data}: { size: number, data: any[][], }) => {
    return (
        <View style={styles.container}>
            {
                Array.from(Array(size).keys()).map(columnIndex => (
                    <View style={styles.row}>
                        {
                            Array.from(Array(size).keys()).map(rowIndex => (
                                <TouchableOpacity style={styles.cell}>
            
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
        backgroundColor: 'white',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        
    }
});

export default Gameboard;