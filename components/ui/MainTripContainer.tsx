import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Trip } from '@/types'
import { formatSimpleDate } from '@/utils'
import { navigate } from 'expo-router/build/global-state/routing'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText'

type MainTripContainerProps = {
    trip: Trip
}

export default function MainTripContainer({ trip } : MainTripContainerProps) {
    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background')
    
    return (
        <Pressable onPress={() => navigate(`/trips/${trip.id}`)} style={[styles.container, { backgroundColor }]}>
            <ThemedText style={styles.destiny}>{trip.destiny}</ThemedText>
            <ThemedText style={styles.date}>Departure: {formatSimpleDate(new Date(trip.departureDate))}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.075,
        shadowRadius: 10,
        elevation: 2.5,
    }, 
    destiny: {
        fontWeight: '800', 
        fontSize: 22
    }, 
    date: {
        fontSize: 18
    }
})