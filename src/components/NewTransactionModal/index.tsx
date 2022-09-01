import { FormEvent, useContext, useState } from "react";

import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";


import CloseButton from "../../assets/CloseButton.svg";
import Income from "../../assets/income.svg";
import Outcome from "../../assets/outcome.svg";
import { api } from "../../services/api";
import { useTransaction } from "../../hooks/useTransaction";



Modal.setAppElement('#root');

type Props = {
    isOpen: boolean;
    onRequestCloseModal: () => void;
}

export function NewTransactionModal({ isOpen, onRequestCloseModal }: Props) {
    const { createTransaction } = useTransaction();
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState(String);
    const [amount, setAmount] = useState(Number);
    const [category, setCategory] = useState('');




    const handleCreateNewTransaction = async (event: FormEvent) => {
        event.preventDefault();


        await createTransaction({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0)
        setCategory('');
        setType('deposit');

        onRequestCloseModal();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                onClick={onRequestCloseModal}
                className="react-modal-close"
            >
                <img src={CloseButton} alt="Fechar Modal" />
            </button>


            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input
                    type="text"
                    placeholder="Titulo"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={(event) => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType("deposit")}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={Income} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>


                    <RadioBox
                        type="button"
                        onClick={() => setType("withdraw")}
                        isActive={type === 'withdraw'}
                        activeColor="red"

                    >
                        <img src={Outcome} alt="Saida" />
                        <span>Saidas</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />

                <button type="submit">Cadastrar</button>

            </Container>
        </Modal>
    )
}