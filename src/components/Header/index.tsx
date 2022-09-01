import logo from "../../assets/logo.svg";
import { Container, Content } from "./styles";

type Props = {
    onOpenNewTransactionModal: () => void
}
export function Header({onOpenNewTransactionModal}:Props) {
   

    return (
        <Container>
            <Content>
                <img src={logo} alt="dtmoney" />
                <button type="button" onClick={onOpenNewTransactionModal}> Nova transação</button>
            </Content>
        </Container>
    )
}