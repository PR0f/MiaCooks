import { View, Platform, StyleSheet, Pressable } from 'react-native';
import React from 'react'
import { ParamListBase, useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabbar}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                        ? options.title
                        : route.name;

                const icon = options.tabBarIcon;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton 
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress} 
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? "#FF8800" : "#222"}
                        label={label}
                        icon={icon}
                        />
                )

                /*return (
                    <Pressable
                        key={route.name}
                        style={styles.tabbarItem}
                        //href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        {

                            icon?.({
                                color: isFocused ? "red" : "#222",
                                focused: false,
                                size: 26
                            })

                        }
                        <Text style={{ color: isFocused ? "red" : "#222" }}>
                            {label}
                        </Text>
                    </Pressable >
                );*/
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 5,
    },
    
})

export default TabBar