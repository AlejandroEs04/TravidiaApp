import { Tabs } from 'expo-router';
import React from 'react';

import { CustomNav } from '@/components/CustomNav';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomNav {...props} />}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="requestTrip"
        options={{
          title: 'Request Business Trip',
          tabBarIcon: ({ focused, color }) => (
            <Animated.View style={{ transform: [{ scale: focused ? 1.1 : 1 }] }}>
              <FontAwesome name="plus" size={50} color={color} />
            </Animated.View>
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome name="gear" size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}
