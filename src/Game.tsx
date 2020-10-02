import Matter from 'matter-js';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Box from './components/Box';
import { CEILING_HEIGHT, FLOOR_HEIGHT, WIDTH } from './constants';

export default function Game() {

    // ------------------------------------------------------------------------
    // Create engine and world
    // ------------------------------------------------------------------------
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    // ------------------------------------------------------------------------
    // Create initial objects
    // ------------------------------------------------------------------------
    const ceiling = Matter.Bodies.rectangle(0, CEILING_HEIGHT, WIDTH, 1, { isStatic: true });
    const floor = Matter.Bodies.rectangle(0, FLOOR_HEIGHT, WIDTH, 1, { isStatic: true });

    // const initialBox = Matter.Bodies.rectangle(10, height / 2, boxSize, boxSize);
    // const background = Matter.Bodies.rectangle(0, 0, width, height, { isStatic: true });

    // ------------------------------------------------------------------------
    // Add objects to world
    // ------------------------------------------------------------------------
    Matter.World.add(world, [ceiling, floor]);

    // ------------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------------

    return (
        <GameEngine
            style={styles.container}
            systems={[]}
            entities={{
                physics: { engine: engine, world: world },
                ceiling: { body: ceiling, size: [WIDTH, 1], color: "black", renderer: Box },
                floor: { body: floor, size: [WIDTH, 1], color: "black", renderer: Box },

                // initialBox: { body: initialBox, size: [boxSize, boxSize], color: 'red', renderer: Box },
                // background: { body: background, size: [width, height], color: 'gray', renderer: Box }
            }}
        >

        </GameEngine>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});