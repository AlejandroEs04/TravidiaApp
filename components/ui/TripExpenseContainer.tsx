import { Colors } from '@/constants/Colors'
import { useAppContext } from '@/hooks/AppContext'
import { useThemeColor } from '@/hooks/useThemeColor'
import { TripExpense } from '@/types'
import { formatUSD } from '@/utils'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemedText } from '../ThemedText'

type TripExpenseContainerProps = {
    tripExpense: TripExpense
}

export default function TripExpenseContainer({ tripExpense } : TripExpenseContainerProps) {
    const { expenses } = useAppContext()
    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background')
    
    return (
        <View style={[styles.container, {backgroundColor}]}>
            <ThemedText style={{ fontSize: 20, fontWeight: '800' }}>{expenses.find(e => e.id === tripExpense.expenseId)?.name}</ThemedText>
            <ThemedText style={{ fontSize: 22, fontWeight: '800', color: Colors.primary }}>{formatUSD(tripExpense.amount)}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10, 
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 3
    }
})