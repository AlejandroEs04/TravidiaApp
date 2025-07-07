import { getTrips } from '@/api/tripApi';
import { Trip } from '@/types';
import { usePathname, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AppContextType = {
    handleIsAuth: () => Promise<boolean>
    handleSetAuth: (token: string) => Promise<void>
    logOut: () => Promise<void>
    trips: Trip[]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [trips, setTrips] = useState<Trip[]>([])
    const pathname = usePathname()
    const router = useRouter()

    const getInfo = async() => {
        try {
            const trips = await getTrips()

            if(trips) {
                setTrips(trips)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleIsAuth = async() => {
        const token = await SecureStore.getItemAsync('userToken');
        if(token === null) return false;

        getInfo()
        return true
    }

    const handleSetAuth = async(token: string) => {
        await SecureStore.setItemAsync('userToken', token);
        getInfo()
    }

    const logOut = async() => {
        await SecureStore.deleteItemAsync('userToken');

        router.push('/auth/login')
    }

    useEffect(() => {
        const checkIsAuth = async() => {
            if(!await handleIsAuth() && pathname != 'auth/login') {
                router.push('/auth/login')
            }
        }
        checkIsAuth()
    }, [pathname])

    return (
        <AppContext.Provider value={{ handleIsAuth, handleSetAuth, logOut, trips }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};