import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Trip } from '@/types'
import { formatCompleteDate, formatSimpleDate } from '@/utils'
import { navigate } from 'expo-router/build/global-state/routing'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import ThemedButton from '../ThemedButton'
import { ThemedText } from '../ThemedText'

type MainCurrentTripProps = {
    trip: Trip
}

export default function MainCurrentTrip({ trip } : MainCurrentTripProps) {
    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background')

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ThemedText style={styles.destiny}>{trip.destiny}</ThemedText>
            <ThemedText style={styles.tripDate}>{formatCompleteDate(trip.createdAt)}</ThemedText>

            <View style={styles.infoContainer}>
                <ThemedText style={styles.information}>From: <ThemedText style={styles.informationBold}>{trip.origin}</ThemedText></ThemedText>
                <ThemedText style={styles.information}>Departure: <ThemedText style={styles.informationBold}>{formatSimpleDate(new Date(trip.departureDate))}</ThemedText></ThemedText>
                <ThemedText style={styles.information}>Returned: <ThemedText style={styles.informationBold}>{formatSimpleDate(new Date(trip.returnedDate))}</ThemedText></ThemedText>
            </View>

            <View style={styles.infoContainer}>
                <ThemedText style={styles.information}>Originator: <ThemedText style={styles.informationBold}>{trip.originatorName}</ThemedText></ThemedText>
            </View>

            <ThemedButton text='Expenses Report' onClick={() => navigate(`/trips/${trip.id}/expensesReport`)} size='small' styles={{ marginTop: 10 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12, 
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.075,
        shadowRadius: 20,
        elevation: 9,
    },
    destiny: {
        fontSize: 26, 
        fontWeight: '800', 
    }, 
    infoContainer: {
        gap: 5, 
        marginTop: 10
    },
    information: {
        fontSize: 18
    },
    informationBold: {
        fontWeight: '800'
    }, 
    tripDate: {
        fontSize: 15, 
        fontWeight: '800', 
        color: '#7c7c7c'
    }
})