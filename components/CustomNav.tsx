import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const ICONS = ['home', 'plus', 'gear'];

export function CustomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background')
  const color = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text')
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = ICONS[index];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const isCenter = index === 1;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={[
              styles.tab,
              isCenter && [styles.centerTab, { backgroundColor: isFocused ? '#237cfc' : '#729bff' }],
            ]}
          >
            <FontAwesome
              name={iconName as any}
              size={isCenter ? 40 : 38}
              color={isFocused ? isCenter ? '#fff' : '#237cfc' : isCenter ? '#fff' : color}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 70,
        backgroundColor: '#fff',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerTab: {
        marginTop: -16,
        borderRadius: 40,
        width: 60,
        height: 60,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
});