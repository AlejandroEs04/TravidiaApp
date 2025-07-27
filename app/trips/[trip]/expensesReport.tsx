import { getExpenses } from '@/api/expensesApi'
import { createTripExpenses } from '@/api/tripExpenseApi'
import Input from '@/components/Input'
import InputFile from '@/components/InputFile'
import Select from '@/components/Select'
import ThemedButton from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import ErrorContainer from '@/components/ui/ErrorContainer'
import { Colors } from '@/constants/Colors'
import { useAppContext } from '@/hooks/AppContext'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Expense, Trip } from '@/types'
import { formatSimpleDate } from '@/utils'
import { FontAwesome } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as DocumentPicker from 'expo-document-picker'
import { useGlobalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Platform, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native'

const initialState = {
    expenseId: 0, 
    amount: 0, 
    reportedDate: new Date()
}

export default function expensesReport() {
    const { trips } = useAppContext()
    const global = useGlobalSearchParams()
    const [trip, setTrip] = useState<Trip>()
    const [days, setDays] = useState<string[]>([])
    const [reportDate, setReportDate] = useState<Date | null>(null)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [error, setError] = useState<string | null>(null)
    const [expense, setExpense] = useState(initialState)
    const [selectedDocuments, setSelectedDocuments] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background')
    const color = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text')

    const navigation = useNavigation()

    const statusBarHeight =
        Platform.OS === 'android'
        ? StatusBar.currentHeight ?? 0
        : Constants.statusBarHeight;

    const handleGetDays = () => {
        if(!trip) return

        const departure = new Date(trip.departureDate).getTime()
        const returned = new Date(trip.returnedDate).getTime()

        const arrayDays : string[] = []

        for(let i = 0; i-1<(returned - departure) / 86400000;i++) {
            const diff = departure + (86400000 * i+1)
            const newDate = new Date(diff).toString()

            arrayDays.push(newDate)
        }

        setDays(arrayDays)
    }

    const handleSetReportDate = (date: string) => {
        setReportDate(new Date(date))
    }

    const handleChange = (value: string, name: string) => {
        setExpense({
            ...expense,
            [name]: value
        });
    }

    const handleSubmit = async() => {
        try {
            const response = await createTripExpenses(trip?.id!, expense)
            console.log(response)
        } catch (error) {
            console.log(error)
            if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
                setError((error as any).message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    }

    useEffect(() => {
        const getInfo = async() => {
            const expenses = await getExpenses()
            
            if(!expenses) return

            setExpenses(expenses)
        }

        const currentTrip = trips.find(t => t.id === +global.trip)
        setTrip(currentTrip)

        getInfo()
    }, [])

    useEffect(() => {
        handleGetDays()
    }, [trip])

    useEffect(() => {
        if(reportDate)
            setExpense({
                ...expense, 
                reportedDate: reportDate
            })
    }, [reportDate])

    return (
        <ThemedView style={[ styles.container, { paddingTop: statusBarHeight + 20 } ]}>
            <ScrollView
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
            >
                <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <FontAwesome name="arrow-left" size={20} color={color} />
                    <ThemedText style={{ fontSize: 20 }}>Back</ThemedText>
                </Pressable>

                <ThemedText type='title' style={{ marginTop: 20 }}>{trip?.destiny}</ThemedText>

                <FlatList
                    horizontal
                    data={days}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <ThemedButton
                            key={item}
                            text={formatSimpleDate(new Date(item))}
                            onClick={() => handleSetReportDate(item)}
                            styles={[styles.actionCard, {backgroundColor}]}
                            textStyle={{ color }}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                />
                
                {reportDate ? (
                    <View style={{ marginTop: 20 }}>
                        <ThemedText type='subtitle' style={{ color: Colors.primary }}>{formatSimpleDate(reportDate)}</ThemedText>
                        
                        {error && <ErrorContainer message={error} />}

                        <View style={{ gap: 10 }}>
                            <Input placeholder='amount' label='Amount (USD)' id='amount' value={expense.amount} onChange={handleChange} type='decimal-pad' />
                            <Select label='Expense' id='expenseId' placeholder='Select an expense' value={expense.expenseId} onChange={handleChange} options={expenses.map(e => ({ label: e.name, value: e.id.toString() }))} />
                            <InputFile selectedDocuments={selectedDocuments} setSelectedDocuments={setSelectedDocuments} label='Evidence' />
                            <ThemedButton text='Save' onClick={handleSubmit} />
                        </View>
                    </View>
                ) : (
                    <ThemedText type='subtitle' style={{ textAlign: 'center', marginTop: 20 }}>Please, select a day</ThemedText>
                )}

                

            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingBottom: 20
    }, 
    actionCard: {
        padding: 10,
        borderRadius: 15, 
        justifyContent: 'center', 
        marginRight: 5,
    }
})