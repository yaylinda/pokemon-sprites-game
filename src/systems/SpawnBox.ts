import Matter from "matter-js";
import { GameEngineUpdateEventOptionType } from "react-native-game-engine";
import Box from "../components/Box";

let boxIds = 0;

const SpawnBox = (entities: any, update: GameEngineUpdateEventOptionType) => {

    const { touches, screen } = update;

    let world = entities["physics"].world;
    let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);

    touches.forEach(t => {
        if (t.type === 'press') {

            console.log(`[SpawnBox]
                t.id=${t.id}
                t.event.identifier=${t.event.identifier}
                t.type=${t.type}
                t.event.pageX=${t.event.pageX}
                t.event.pageY=${t.event.pageY}
                t.event.locationX=${t.event.locationX}
                t.event.locationY=${t.event.locationY}
            `);

            let body = Matter.Bodies.rectangle(
                10,
                10,
                boxSize,
                boxSize,
                {
                    frictionAir: 0.021,
                    restitution: 1.0
                }
            );

            Matter.World.add(world, [body]);

            entities[++boxIds] = {
                body: body,
                size: [boxSize, boxSize],
                color: boxIds % 2 == 0 ? "pink" : "#B8E986",
                renderer: Box
            };
        }
    });
    return entities;
};

export default SpawnBox;