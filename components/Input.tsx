import React from 'react'
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native'
import { ThemedText } from './ThemedText'

type InputProps = {
    placeholder: string
    id: string
    value: string | number
    label?: string
    type?: KeyboardTypeOptions
    secureTextEntry?: boolean
    onChange: (value: string, name: string) => void
    multiline?: boolean
}

const Input = ({ placeholder, label, id, value, onChange, type = 'default', secureTextEntry = false, multiline = false } : InputProps) => {
    return (
        <View>
            {label && (
                <ThemedText style={styles.label}>{label}</ThemedText>
            )}
            <TextInput multiline={multiline} secureTextEntry={secureTextEntry} keyboardType={type} style={styles.input} value={value.toString()} onChangeText={e => onChange(e, id)} placeholder={placeholder} />
        </View>
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

export default Input