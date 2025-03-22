import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';


import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBar from '@/components/TabBar';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs tabBar={props => <TabBar {...props}/>}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,

      }}>
      <Tabs.Screen
        name="test"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28}  color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="description" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Shopping',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
