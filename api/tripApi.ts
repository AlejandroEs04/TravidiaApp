import api from "@/libs/axios";
import { Trip, TripCreate } from "@/types";
import { isAxiosError } from "axios";

export const getTrips = async() => {
    try {
        const { data } = await api<Trip[]>('/Trip')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}

export const createTrip = async(trip: TripCreate) => {
    try {
        const { data } = await api.post<Trip>('/Trip', trip)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}