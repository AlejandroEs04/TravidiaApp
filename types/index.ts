export type Auth = {
    email: string
    password: string
}

export type Token = {
    token: string
}

export type Trip = {
    id: number
    departureDate: string
    returnedDate: string
    destiny: string
    origin: string 
    purpose: string
    requestId: string
    originatorName: string
    document: string
    createdAt: string
    updatedAt: string
    submittedAt: string
    status: string
}

export type TripCreate = Pick<Trip, 'departureDate' | 'returnedDate' | 'destiny' | 'origin' | 'purpose'>