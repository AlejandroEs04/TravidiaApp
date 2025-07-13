import api from "@/libs/axios";
import { TripExpense, TripExpenseCreate } from "@/types";
import { isAxiosError } from "axios";

export const getTripExpenses = async(id: number) => {
    try {
        const { data } = await api<TripExpense[]>(`/TripExpense/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}

export const createTripExpenses = async(id: number, tripRequest: TripExpenseCreate) => {
    try {
        const { data } = await api.post<TripExpense>(`/TripExpense/${id}`, tripRequest)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}