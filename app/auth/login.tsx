import { login as loginApi } from '@/api/authApi';
import Input from '@/components/Input';
import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ErrorContainer from '@/components/ui/ErrorContainer';
import { Colors } from '@/constants/Colors';
import { useAppContext } from '@/hooks/AppContext';
import { Auth } from '@/types';
import { push } from 'expo-router/build/global-state/routing';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Login() {
    const { handleSetAuth } = useAppContext()
    const [error, setError] = useState<string | null>(null)
    const [login, setLogin] = useState<Auth>({
        email: '', 
        password: '',
    })

    const handleChange = (value: string, name: string) => {
        setLogin({
            ...login, 
            [name]: value
        })
    }

    const handleSubmit = async() => {
        try {
            if(login.email.length === 0 || login.password.length === 0) {
                setError('All fields are required')
                return
            }
            
            const token = await loginApi(login)

            if(token) {
                handleSetAuth(token)
                push('/')
            }
        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
                setError((error as any).message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    }
    
    return (
        <ThemedView style={styles.container}>
            <ThemedText type='title' style={{ color: Colors.primary, fontWeight: '900', fontSize: 50 }}>Travidia App</ThemedText>
            <ThemedText>Please fill form for login into app</ThemedText>

            {error && <ErrorContainer message={error} />}

            <View style={styles.form}>
                <Input onChange={handleChange} placeholder='Ej. correo@acreead.com' id='email' label='Email' value={login.email} type='email-address' />
                <Input onChange={handleChange} placeholder='Password' id='password' label='Password' value={login.password} secureTextEntry />
            </View>

            <ThemedButton text='Sign in' onClick={handleSubmit} styles={{ marginTop: 10 }} />

            <ThemedText style={{ marginTop: 20 }}>Did you forget your password? <ThemedText type='link'>click here</ThemedText></ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    form: {
        gap: 8,
        marginTop: 20,
    }
})