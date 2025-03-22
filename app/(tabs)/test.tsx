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
const angleOffset = 0// angleBySegment / 2;

const knobFill = "white";

function randomColorUtility(length: number) {
    return Math.floor(Math.random() * length);
}

function color(amount: number) {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];


    let array = [];
    for (let n = 0; n < amount; n++) {

        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtility(hex.length)];
        }
        array.push(hexColor);
    }
    if (array.length <= 1)
        return array[0];

    return array;
}

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


    //const colors = color(numberOfSegments);
    const colors = [
        "#db7093", "#20b2aa", "#d63e92", "#daa520", "#ff340f", "#ff7f50", "#3cb371", "#4169e1"
    ]

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
            angle: (index * oneTurn) / numberOfSegments + angleOffset,
            index: index

        };
    });

    return result;
};


let wheelPaths = makeWheel();



const getWinnerIndex = (angle: number) => {

    const deg = Math.abs(Math.round(angle % oneTurn));

    let index = Math.floor(deg / angleBySegment);
    if (numberOfSegments == index) {
        index = 0;
    }
    return index;

};



const renderKnob = (angle: SharedValue<number>, direction: number) => {
    const knobSize = 30;
    // [0, numberOfSegments]

    /*const YOLO = Animated.modulo(
        Animated.divide(
            Animated.modulo(Animated.subtract(angle, angleOffset), oneTurn),
            new Animated.Value(angleBySegment)
        ),
        1
    );*/

    console.log(angle.value);

    let outputRange = ['0deg', '0deg', '35deg', '-35deg', '0deg', '0deg'];

    if (direction > 0) {
        outputRange = ['0deg', '0deg', '-35deg', '35deg', '0deg', '0deg']
    }

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{
            rotate: interpolate(
                angle.value,
                [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                [0, 0, 35, -35, 0, 0]
            ) + 'deg',
        }],
    }));

    return (
        <Animated.View
            style={[
                {
                    width: knobSize,
                    height: knobSize * 2,
                    justifyContent: 'flex-end',
                    zIndex: 1,
                },
                animatedStyles
            ]}
        >


            <Svg
                width={knobSize}
                height={(knobSize * 100) / 57}
                viewBox={`0 0 57 100`}
                style={{ transform: [{ translateY: 8 }] }}
            >
                <Path
                    d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
                    fill={`${knobFill}`}
                    stroke={"black"}
                    strokeWidth={2}
                />
            </Svg>
        </Animated.View>
    );
};

const renderWinner = (winner: string) => {

    return (

        <RNText style={styles.winnerText}>Winner is: {winner}</RNText>
    );
};



export default function WheelOfFortune() {

    const angle = useAnimatedValue(0);
    let [direction, setDirection] = useState(1);
    let [winner, setWinner] = useState<string>('');

    const sv = useSharedValue<number>(1);



    /*angle.addListener((_angle) => {

        //let winnerIndex = getWinnerIndex(angle.value);

        for (let i = 0; i < wheelPaths.length; i++) {
            const arc = wheelPaths[i];
            const correctedAngle = Math.abs(_angle.value) % 360;

            if (arc.angle <= correctedAngle && correctedAngle < arc.angle + angleBySegment) {
                console.log(arc.value, arc.index, arc.angle, correctedAngle);
                setWinner(arc.value.toString());
                break;
            }
        }

        //getWinnerIndex(angle.value);
    })*/


    /*const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {

                setDirection(gestureState.vx > 0 ? 1 : -1);

                Animated.decay(angle, {
                    velocity: -gestureState.vx,
                    deceleration: 0.996,
                    useNativeDriver: true
                }).start()




            },


        }),
    ).current;
*/


    const ss_width = useSharedValue<number>(0);
    const SIZE = 180;

    const onLayout = (event: LayoutChangeEvent) => {
        ss_width.value = event.nativeEvent.layout.width;
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
                    /*alignItems: 'center',
                    justifyContent: 'center',
 
                    transform: [
                        {
                            rotate: angle.interpolate({
                                inputRange: [-oneTurn, 0, oneTurn],
                                outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`]
                            })
                        }
                    ]
                }}*/
                    // {...panResponder.panHandlers}
                    >
                        <Svg

                            width={wheelSize}
                            height={wheelSize}
                            viewBox={`0 0 ${width + 10} ${width + 10}`}
                            style={{ transform: [{ rotate: `-${angleOffset}deg` }], }}
                        >

                            <G y={width / 2 + 5} x={width / 2 + 5} >
                                <Circle r={width / 2 + 5} fill={"black"} ></Circle>
                                <Circle r={width / 2 + 3} fill={"white"} ></Circle>
                                {
                                    /*
                                    <Circle  r="20" fill={"white"}></Circle> 
                                    */
                                }


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
        backgroundColor: '#545454',
        alignItems: 'center',
        justifyContent: 'center'
    },
    winnerText: {
        fontSize: 32,
        fontFamily: 'Menlo',
        position: 'absolute',
        color: 'white',
        top: 100
    }
});

