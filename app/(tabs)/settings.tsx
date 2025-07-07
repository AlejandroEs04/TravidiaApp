import ThemedButton from '@/components/ThemedButton'
import { ThemedView } from '@/components/ThemedView'
import { useAppContext } from '@/hooks/AppContext'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function settings() {
    const settings: { name: string; icon: React.ComponentProps<typeof FontAwesome>['name']; url: string }[] = [
        {
            name: 'Profile', 
            icon: 'user-circle', 
            url: 'user/profile'
        }, 
        {
            name: 'Notifications', 
            icon: 'bell', 
            url: 'settings/notifications'
        },
        {
            name: 'History', 
            icon: 'book', 
            url: 'settings/notifications'
        },
        {
            name: 'Change Password', 
            icon: 'key', 
            url: 'settings/changePassword'
        },
        {
            name: 'Display Mode', 
            icon: 'moon-o', 
            url: 'settings/notifications'
        },
        {
            name: 'Help & Support', 
            icon: 'question-circle', 
            url: 'settings/notifications'
        },
    ]

    const { logOut } = useAppContext()
    return (
        <ScrollView>
            <ThemedView style={styles.container}>
                <View style={{gap: 50}}>
                    <View style={styles.settingsContainer}>
                        {settings.map((setting, i) => (
                            <Pressable key={setting.name} style={[
                                styles.settingContainer,
                                i+1 === settings.length ? undefined : styles.settingContainerBorder
                            ]}>
                                <FontAwesome
                                    name={setting.icon}
                                    size={25}
                                    color={'black'}
                                />
                                <Text style={styles.settingContainerText}>{setting.name}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <ThemedButton text='Logout' type='danger' styles={{marginTop: 20}} onClick={logOut} />
            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 20,
        justifyContent: 'space-between'
    }, 
    settingsContainer: {
        backgroundColor: 'white', 
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.075,
        shadowRadius: 20,
        elevation: 9,
    }, 
    settingContainer: {
        flexDirection: 'row', 
        gap: 10,
        padding: 15,
        alignItems: 'center', 
    }, 
    settingContainerBorder: {
        borderBottomWidth: 0.2
    },
    settingContainerText: {
        fontSize: 24, 
    }
})