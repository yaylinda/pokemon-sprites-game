import Matter from "matter-js";
import { GameEngineUpdateEventOptionType } from "react-native-game-engine";

const Physics = (entities: any, update: GameEngineUpdateEventOptionType) => {
    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, update.time.delta);
    return entities;
};

export default Physics;