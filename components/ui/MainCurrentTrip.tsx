import { Trip } from '@/types'
import { formatCompleteDate, formatSimpleDate } from '@/utils'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ThemedButton from '../ThemedButton'

type MainCurrentTripProps = {
    trip: Trip
}

export default function MainCurrentTrip({ trip } : MainCurrentTripProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.destiny}>{trip.destiny}</Text>
            <Text style={styles.tripDate}>{formatCompleteDate(trip.createdAt)}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.information}>From: <Text style={styles.informationBold}>{trip.origin}</Text></Text>
                <Text style={styles.information}>Departure: <Text style={styles.informationBold}>{formatSimpleDate(new Date(trip.departureDate))}</Text></Text>
                <Text style={styles.information}>Returned: <Text style={styles.informationBold}>{formatSimpleDate(new Date(trip.returnedDate))}</Text></Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.information}>Originator: <Text style={styles.informationBold}>{trip.originatorName}</Text></Text>
            </View>

            <ThemedButton text='Expenses Report' onClick={() => console.log('')} size='small' styles={{ marginTop: 10 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
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