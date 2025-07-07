import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ErrorContainerProps = {
    message: string
}

export default function ErrorContainer({ message } : ErrorContainerProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffdfdf', 
        padding: 10, 
        borderRadius: 15, 
    },
    text: {
        color: '#ff1616', 
        fontSize: 18, 
        textAlign: 'center', 
        fontWeight: '800'
    }
})