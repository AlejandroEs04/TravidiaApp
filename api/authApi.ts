import api from "@/libs/axios";
import { Auth, Token } from "@/types";
import { isAxiosError } from "axios";

export const login = async(userLogin: Auth) => {
    try {
        const { data } = await api.post<Token>('/Auth', userLogin)
        return data.token
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}