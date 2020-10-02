import * as React from 'react';
import { View } from "react-native";

const Box = (props: {
    body: any,
    size: number[],
    color: string
}) => {

    const { body, size, color } = props;
    const width = size[0];
    const height = size[1];
    const x = body.position.x - width / 2;
    const y = body.position.y;

    // console.log(`[Box]
    //     width: ${width}
    //     height: ${height}
    //     x: ${x}
    //     y: ${y}
    // `);

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: color || "pink",
            }} />
    )
}

export default Box;