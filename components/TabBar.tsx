import { View, Platform, StyleSheet, Pressable } from 'react-native';
import React from 'react'
import { ParamListBase, useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';
import { router } from 'expo-router';

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
                    

                    if (!isFocused) {
                        
                        //navigation.navigate(route.name, route.params);
                        console.log(route.name)
                        router.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    
                };

                if(options.title == undefined) {
                    return;
                }

                return (
                    <TabBarButton 
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress} 
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? "#FF9800" : "#212121"}
                        label={label}
                        icon={icon}
                        />
                )

            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',

        /*
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 5,
        */
        boxShadow: '0 3 5 3 rgba(0, 0, 0, 0.5)',
    },
    
})

export default TabBar