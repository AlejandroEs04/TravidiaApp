import React from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { ThemedText } from './ThemedText'

type SelectOptionProps = {
    label: string
    value: string
}

type SelectProps = {
    placeholder: string
    id: string
    value: string | number
    label?: string
    options: SelectOptionProps[]
    onChange: (value: string, name: string) => void
}

export default function Select({ placeholder, label, id, value, onChange, options} : SelectProps) {
    return (
        <View>
            {label && (
                <ThemedText style={styles.label}>{label}</ThemedText>
            )}
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => onChange(value, id)}
                        value={value}
                        placeholder={{ label: placeholder, value: null }}
                        items={options}
                        style={{
                            inputAndroid: styles.input,
                            inputIOS: styles.input,
                        }}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectContainer: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderRadius: 15,
        backgroundColor: '#fff',
        marginTop: 5,
        elevation: 1,
        color: '#000',
        borderColor: 'red',
        position: 'relative', // 👈 NECESARIO para que zIndex funcione
        zIndex: 10,            // 👈 Asegura que no bloquee componentes debajo
    },
    placeholder: {
        color: '#888',
        fontSize: 20,
    },
    input: {
        color: '#000',
        fontSize: 20,
    },
    label: {
        fontSize: 24,
        fontWeight: '800',
    }
})