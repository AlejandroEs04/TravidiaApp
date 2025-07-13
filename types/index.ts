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
    expenses: TripExpense[]
}

export type TripCreate = Pick<Trip, 'departureDate' | 'returnedDate' | 'destiny' | 'origin' | 'purpose'>

export type Expense = {
    id: number
    name: string
    limit: number
}

export type TripExpense = {
    id: number
    tripRequestId: number
    requestId: number
    expenseId: number
    amount: number
    reportedDate: Date
    createdAt: Date
    updatedAt: Date
}

export type TripExpenseCreate = Pick<TripExpense, 'amount' | 'expenseId' | 'reportedDate'>