import { createTrip } from '@/api/tripApi';
import DateInput from '@/components/DateInput';
import Input from '@/components/Input';
import ThemedButton from '@/components/ThemedButton';
import { ThemedView } from '@/components/ThemedView';
import ErrorContainer from '@/components/ui/ErrorContainer';
import { TripCreate } from '@/types';
import { navigate } from 'expo-router/build/global-state/routing';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const initialState = {
    departureDate: '', 
    returnedDate: '',
    destiny: '', 
    origin: '',
    purpose: ''
}

export default function requestTrip() {
    const [error, setError] = useState<string | null>(null)
    const [tripRequest, setTripRequest] = useState<TripCreate>(initialState)
    
    const handleChange = (value: string, name: string) => {
        let fixedValue = value;

        if (name === 'departureDate' || name === 'returnedDate') {
            const date = new Date(value);
            date.setDate(date.getDate() - 1);
            fixedValue = date.toISOString().substring(0, 10); 
        }

        setTripRequest({
            ...tripRequest,
            [name]: fixedValue
        });
    }
    
    const handleSubmit = async() => {
        try {
            if(tripRequest.origin.length === 0 || tripRequest.destiny.length === 0 || tripRequest.departureDate.length === 0 || tripRequest.returnedDate.length === 0 || tripRequest.purpose.length === 0) {
                setError('All fields are required')
            }

            console.log(tripRequest)

            tripRequest.departureDate = tripRequest.departureDate.substring(0, 10)
            tripRequest.returnedDate = tripRequest.returnedDate.substring(0, 10)

            console.log(tripRequest)

            await createTrip(tripRequest)

            setTripRequest(initialState)
            navigate('/')
        } catch (error) {
            console.log(error)
            if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
                setError((error as any).message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    }

    const adjustDisplayedDate = (value: string): string => {
        if (!value) return "";

        const date = new Date(value);
        date.setDate(date.getDate() + 1);
        return date.toISOString().substring(0, 10);
    }

    return (
        <ThemedView style={styles.container}>
            <ScrollView>
                {error && <ErrorContainer message={error} />}
                
                <View style={{ gap: 10, marginTop: 10 }}>
                    <Input placeholder='Destiny' label='Destiny' id='destiny' value={tripRequest.destiny} onChange={handleChange} />
                    <Input placeholder='Origin' label='Origin' id='origin' value={tripRequest.origin} onChange={handleChange} />
                    <DateInput placeholder='Departure Date' label='Departure Date' id='departureDate' value={adjustDisplayedDate(tripRequest.departureDate)} onChange={handleChange} />
                    <DateInput placeholder='Returned Date' label='Returned Date' id='returnedDate' value={adjustDisplayedDate(tripRequest.returnedDate)} onChange={handleChange} />
                    <Input placeholder='Purpose' label='Purpose' id='purpose' value={tripRequest.purpose} multiline onChange={handleChange} />
                    <ThemedButton text='Save & Submit' onClick={handleSubmit} />
                </View> 
            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
    },
})
