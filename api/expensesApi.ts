import api from "@/libs/axios";
import { Expense } from "@/types";
import { isAxiosError } from "axios";

export const getExpenses = async() => {
    try {
        const { data } = await api<Expense[]>('/Expense')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}