import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text as RNText,
    Dimensions,
    useAnimatedValue,
    PanResponder,
    LayoutChangeEvent
} from 'react-native';
import * as d3Shape from 'd3-shape';
import Svg, { Circle, G, Path, Rect, Text, TSpan } from 'react-native-svg';
import Animated, { interpolate, runOnJS, SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView, PanGesture } from 'react-native-gesture-handler';


const { width } = Dimensions.get('screen');

const numberOfSegments = 8;//12;
const wheelSize = width * 0.95;
const fontSize = 26;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;

const knobFill = "white";


const makeWheel = (): {
    path: string | null;
    color: string;
    value: number;
    centroid: [number, number];
    angle: number,
    index: number
}[] => {
    const data = Array(numberOfSegments).fill(1);
    const arcs = d3Shape.pie()(data);

    //rgb(255, 152, 0)
    const colors = [
        "rgb(255, 152, 0)", "rgb(0, 0, 0)", "rgb(255, 152, 0)", "rgb(0, 0, 0)", "rgb(255, 152, 0)", "rgb(0, 0, 0)", "rgb(255, 152, 0)", "rgb(0, 0, 0)"
    ]
    /*const colors = [
        "#db7093", "#20b2aa", "#d63e92", "#daa520", "#ff340f", "#ff7f50", "#3cb371", "#4169e1"
    ]*/

    const result = arcs.map((arc: any, index: any) => {
        const instance = d3Shape
            .arc()
            .cornerRadius(5)
            .padAngle(0.01)
            //.padRadius(10)
            .outerRadius(width / 2)
            .innerRadius(15)



        return {
            path: instance(arc),
            color: colors[index],
            value: Math.round(Math.random() * 10 + 1) * 200, //[200, 2200]
            centroid: instance.centroid(arc),
            angle: (index * oneTurn) / numberOfSegments ,
            index: index

        };
    });

    return result;
};


let wheelPaths = makeWheel();



const renderWinner = (winner: string) => {

    return (

        <RNText style={styles.winnerText}>Winner is: {winner}</RNText>
    );
};



export default function WheelOfFortune() {

    let [winner, setWinner] = useState<string>('');

    const sv = useSharedValue<number>(1);

    const screenWidth = useSharedValue<number>(0);

    const onLayout = (event: LayoutChangeEvent) => {
        screenWidth.value = event.nativeEvent.layout.width;
    };

    const pan: PanGesture = Gesture.Pan()



        .onChange((event) => {
            sv.value = withDecay({
                velocity: -event.velocityX,
                velocityFactor: 1.2,
                deceleration: 0.994,
            }, (finished) => {
                if (finished) {

                    for (let i = 0; i < wheelPaths.length; i++) {
                        const arc = wheelPaths[i];

                        const degNormilized = sv.value % 360
                        //console.log(degNormilized)
                        const correctedAngle = Math.abs(sv.value) % 360;

                        if (arc.angle <= correctedAngle && correctedAngle < arc.angle + angleBySegment) {
                            //console.log(arc.value, arc.index, arc.angle, correctedAngle);
                            runOnJS(setWinner)(arc.value.toString())
                            break;
                        }
                    }

                }
            });

            console.log((Math.abs((sv.value % (angleBySegment))) - angleBySegment / 2) / (angleBySegment / 2))

        })






    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{
            rotate: interpolate(
                sv.value,
                [-360, 0, 360],
                [-360, 0, 360]
            ) + 'deg',
        }],
    }));


    const knobSize = 30;

    return (


        <GestureHandlerRootView >
            <View onLayout={onLayout} style={styles.container}>
                <View
                    style={[
                        {
                            width: knobSize,
                            height: knobSize * 2,
                            justifyContent: 'flex-end',
                            zIndex: 1,
                        }
                    ]}
                >


                    <Svg
                        width={knobSize}
                        height={(knobSize * 100) / 57}
                        viewBox={`0 0 57 100`}
                        style={{ transform: [{ translateY: 8 }] }}
                    >
                        <Path
                            d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z"
                            fill={`${knobFill}`}
                            stroke={"black"}
                            strokeWidth={2}
                        />
                    </Svg>
                </View>

                <GestureDetector gesture={pan}>
                    <Animated.View
                        style={[
                            {
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            animatedStyles
                        ]}

                    >
                        <Svg

                            width={wheelSize}
                            height={wheelSize}
                            viewBox={`0 0 ${width + 10} ${width + 10}`}
                        >

                            <G y={width / 2 + 5} x={width / 2 + 5} >
                                <Circle r={width / 2 + 5} fill={"black"} ></Circle>
                                <Circle r={width / 2 + 3} fill={"white"} ></Circle>
                               


                                {wheelPaths.map((arc) => {
                                    const [x, y] = arc.centroid;
                                    const number = arc.value.toString();



                                    if (arc.path == undefined) return;

                                    return (
                                        <G key={`arc-${arc.index}`}>

                                            <Path d={arc.path} fill={arc.color} />

                                            <G
                                                rotation={arc.angle}
                                                origin={`${x}, ${y}`}
                                            >
                                                <Text
                                                    x={x}
                                                    y={y - 70}
                                                    fill="white"
                                                    textAnchor="middle"
                                                    fontSize={fontSize}
                                                    fontWeight={'800'}

                                                >
                                                    <TSpan
                                                        x={x}
                                                        dy={fontSize}

                                                        rotation={110}
                                                        origin={`${x - 10}, ${y - 35}`}
                                                        //rotation={angleBySegment/2}
                                                        //origin={`${x }, ${y }`}
                                                        fontSize={30}

                                                    >
                                                        {
                                                            //"?"
                                                            number
                                                        }
                                                    </TSpan>
                                                </Text>
                                            </G>
                                        </G>
                                    );
                                })}
                            </G>
                        </Svg>
                    </Animated.View>
                </GestureDetector>

                {renderWinner(winner)}
            </View>
        </GestureHandlerRootView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(220, 220, 220)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    winnerText: {
        fontSize: 32,
        fontFamily: 'Menlo',
        position: 'absolute',
        color: 'black',
        top: 100
    }
});

