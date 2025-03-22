import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = (props: any) => {
    const {isFocused, label, routeName, color, icon} = props;

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0): isFocused,
        {duration: 350}
        )
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {

        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [0.8, 1.2]
        );

        return {
            transform: [{scale: scaleValue}]
        }
    })

    return (
        <Pressable {...props} style={styles.container}>
            <Animated.View style={[animatedIconStyle]}>
            {

                icon?.({
                    color: color,
                    focused: false,
                    size: 26
                })

            }
            </Animated.View>
            <Text style={{ color: color }}>
                {label}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TabBarButton