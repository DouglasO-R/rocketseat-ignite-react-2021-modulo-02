import { createServer, Model } from "miragejs";
import { useState } from "react";


import { Header } from "./components/Header";
import { Dashboard } from "./pages/Dashboard";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionProvider } from "./hooks/useTransaction";

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Transactions",
          category: "Test",
          amount: 400,
          type: "deposit",
          createdAt: new Date().toISOString()
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    })
  }
});


function App() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  const handleOpenNewTransactionModal = () => {
    setIsNewTransactionOpen(true);
  }

  const handleCloseNewTransactionModal = () => {
    setIsNewTransactionOpen(false);

  }

  return (
    <TransactionProvider>

      <GlobalStyle />

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionOpen}
        onRequestCloseModal={handleCloseNewTransactionModal}
      />

    </TransactionProvider>
  );
}

export default App;
