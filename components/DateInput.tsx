import { formatSimpleDate } from '@/utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from './ThemedText';

type InputProps = {
    placeholder: string
    id: string
    value: string
    label?: string
    type?: KeyboardTypeOptions
    secureTextEntry?: boolean
    onChange: (value: string, name: string) => void
    multiline?: boolean
}

export default function DateInput({ placeholder, label, id, value, onChange, type = 'default', secureTextEntry = false, multiline = false } : InputProps) {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState<'date' | 'time'>('date');

    const showDatePicker = () => {
        setMode('date');
        setShow(true);
    };

    const handleDateChange = (event: any, selectedDate?: Date | undefined) => {
        setShow(false)
        if (selectedDate) {
            onChange(selectedDate.toISOString(), id)
        }
    };

    return (
        <>
            <View>
                {label && (
                    <ThemedText style={styles.label}>{label}</ThemedText>
                )}
                <TextInput multiline={multiline} secureTextEntry={secureTextEntry} keyboardType={type} style={styles.input} value={value.length > 0 ? formatSimpleDate(new Date(value)) : ''} onPress={showDatePicker} placeholder={placeholder} />
            </View>

            {show && (
                <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode={'date'}
                    display='calendar'
                    fullscreen
                    onChange={handleDateChange}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20, 
        paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 15,
        backgroundColor: '#fff',
        marginTop: 5,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 1,
    },
    label: {
        fontSize: 24,
        fontWeight: '800'
    }
})