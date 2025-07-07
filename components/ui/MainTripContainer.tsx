import { Trip } from '@/types'
import { formatSimpleDate } from '@/utils'
import { navigate } from 'expo-router/build/global-state/routing'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

type MainTripContainerProps = {
    trip: Trip
}

export default function MainTripContainer({ trip } : MainTripContainerProps) {
    return (
        <Pressable onPress={() => navigate(`/trips/${trip.id}`)} style={styles.container}>
            <Text style={styles.destiny}>{trip.destiny}</Text>
            <Text style={styles.date}>Departure: {formatSimpleDate(new Date(trip.departureDate))}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
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