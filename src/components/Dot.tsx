import * as React from 'react';
import { StyleSheet, View } from "react-native";

const Dot = (props: {
    position: number[],
    radius: number,
    color: string
}) => {

    const x: number = props.position[0] - props.radius / 2;
    const y: number = props.position[1] - props.radius / 2;

    return (
        <View style={
            [styles.finger, {
                left: x,
                top: y,
                borderRadius: props.radius * 2,
                width: props.radius * 2,
                height: props.radius * 2,
                backgroundColor: "pink",
            }]}
        />
    );
}

const styles = StyleSheet.create({
    finger: {
        borderColor: "#CCC",
        borderWidth: 4,
        position: "absolute"
    }
});

export default Dot;