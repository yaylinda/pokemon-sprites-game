import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Dot from './components/Dot';
import { update } from './systems';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(`[Game] - width: ${WIDTH}, height: ${HEIGHT}`);

export default function Game() {

    return (
        <GameEngine
            style={styles.container}
            systems={[update]}
            entities={{
                dot: { 
                    position: [40, 200], 
                    renderer: <Dot position={[40, 200]} radius={20} color="pink" /> 
                },
            }}>

        </GameEngine>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});