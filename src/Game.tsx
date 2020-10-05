import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

export default function Game() {
    
    useEffect(() => {
        console.log()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <View style={styles.body}>

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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    body: {
        flex: 1,
    },
    footer: {
        flex: 1,
        maxHeight: HEIGHT * 0.2,
        borderTopColor: 'black',
        borderTopWidth: 1,
    },
});