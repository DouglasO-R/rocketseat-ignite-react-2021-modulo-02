import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


type TransactionContextData = {
    transactions: Transaction[];
    createTransaction: (transaction: createTransaction) => Promise<void>;
}


const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

type Transaction = {
    id: number;
    title: string;
    category: string;
    amount: number;
    type: string;
    createdAt: string;
}

type Props = {
    children: ReactNode
}

type createTransaction = Omit<Transaction, "id" | "createdAt">


export function TransactionProvider({ children }: Props) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get("/transactions")
            .then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: createTransaction) {
        const response = await api.post("/transactions", {...transactionInput,createdAt:new Date()});
        const { transaction } = response.data;

        setTransactions((prev) => [...prev,transaction])
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}

export function useTransaction(){
    const context = useContext(TransactionContext);

    return context;
}