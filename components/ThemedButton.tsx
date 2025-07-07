import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

type ThemedButtonProps = {
    onClick: () => void
    text: string
    type?: 'default' | 'danger' | 'success'
    size?: 'default' | 'small'
    styles?: StyleProp<ViewStyle>
}

export default function ThemedButton({ onClick, text, type = 'default', styles, size = 'default' } : ThemedButtonProps) {
    const colorScheme = useColorScheme()

    return (
        <Pressable 
            style={[
                type === 'default' ? { backgroundColor: Colors.primary } : undefined,
                type === 'danger' ? buttonStyles.buttonDanger : undefined,
                size === 'default' ? buttonStyles.buttonDefault : undefined,
                size === 'small' ? buttonStyles.buttonSmall : undefined,
                buttonStyles.button, 
                styles
            ]} 
            onPress={onClick}>
            <Text style={[
                buttonStyles.text, 
                size === 'default' ? buttonStyles.textDefault : undefined,
                size === 'small' ? buttonStyles.textSmall : undefined,
            ]}>{text}</Text>
        </Pressable>
    )
}

const buttonStyles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        width: 'auto',
        borderRadius: 10
    },
    buttonDanger: {
        backgroundColor: 'red'
    },
    text: {
        color: 'white', 
        fontWeight: '800',
        textAlign: 'center'
    },
    textDefault: {
        fontSize: 20,
    }, 
    textSmall: {
        fontSize: 15
    }, 
    buttonDefault: {
        paddingVertical: 10,
    }, 
    buttonSmall: {
        paddingVertical: 8
    }
})