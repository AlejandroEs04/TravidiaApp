import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import TripExpenseContainer from '@/components/ui/TripExpenseContainer'
import { Colors } from '@/constants/Colors'
import { useAppContext } from '@/hooks/AppContext'
import { Trip as TripType } from '@/types'
import { formatCompleteDate, formatSimpleDate } from '@/utils'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'

type TripInformationProps = {
    title: string
    value: string
}

const TripInformation = ({ title, value } : TripInformationProps) => {
    return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <ThemedText style={{ fontSize: 22, fontWeight: '800' }}>{title}:</ThemedText>
            <ThemedText style={{ fontSize: 22 }}>{value}</ThemedText>
        </View>
    )
}

export default function Trip() {
    const [currentTrip, setCurrentTrip] = useState<TripType | null>(null)
    const { trips } = useAppContext()
    const local = useLocalSearchParams()

    const [days, setDays] = useState<string[]>([])

    const handleGetDays = () => {
        if(!currentTrip) return

        const departure = new Date(currentTrip.departureDate).getTime()
        const returned = new Date(currentTrip.returnedDate).getTime()

        const arrayDays : string[] = []

        for(let i = 0; i-1<(returned - departure) / 86400000;i++) {
            const diff = departure + (86400000 * i+1)
            const newDate = new Date(diff).toString()

            arrayDays.push(newDate)
        }

        setDays(arrayDays)
    }

    useEffect(() => {
        const trip = trips.find(t => t.id === +local.trip)

        if(trip)
            setCurrentTrip(trip)
    }, [])

    useEffect(() => {
        handleGetDays()
    }, [currentTrip])
    if(currentTrip === null) return (
        <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
            <ThemedText style={{ textAlign: 'center' }} type='subtitle'>Trip information not available yet</ThemedText>
            <ActivityIndicator style={{ marginTop: 20 }} size='large' />
        </ThemedView>
    )

    return (
        <ThemedView style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <ThemedText type='title'>{currentTrip.destiny}</ThemedText>
                <ThemedText>Created At: {formatCompleteDate(currentTrip.createdAt)}</ThemedText>

                <View style={{ marginTop: 10 }}>
                    <ThemedText style={{ fontSize: 20, fontWeight: '800' }}>Status: <Text style={{ fontWeight: '400' }}>{currentTrip.status}</Text></ThemedText>
                </View>

                <View style={{ marginTop: 20 }}>
                    <ThemedText type='subtitle'>General Information</ThemedText>

                    <View style={{ marginTop: 5, gap: 5 }}>
                        <TripInformation title='Origin' value={currentTrip.origin} />
                        <TripInformation title='Destiny' value={currentTrip.destiny} />
                        <TripInformation title='Departure Date' value={formatSimpleDate(new Date(currentTrip.departureDate))} />
                        <TripInformation title='Returned Date' value={formatSimpleDate(new Date(currentTrip.returnedDate))} />
                    </View>
                </View>

                <View style={{ marginTop: 20, gap: 15 }}>
                    {days.map(day => (
                        <View key={day}>
                            <ThemedText type='subtitle'>{formatSimpleDate(new Date(day))}</ThemedText>
                            
                            {currentTrip.expenses.filter(e => new Date(e.reportedDate).getTime() === new Date(day).getTime()).length > 0 ? (
                                <View style={{ gap: 10 }}>
                                    {currentTrip.expenses.filter(e => new Date(e.reportedDate).getTime() === new Date(day).getTime()).map(expense => (
                                        <TripExpenseContainer key={expense.id} tripExpense={expense} />
                                    ))}
                                </View>
                            ) : (
                                <View>
                                    <ThemedText style={{ fontSize: 18, fontWeight: '600', color: Colors.primary }}>There's not expenses reported yet</ThemedText>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 20,
    }, 
})