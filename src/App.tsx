import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { TransactionProvider } from './contexts/TransactionContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 w-full lg:ml-64">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/deposit" replace />} />
      <Route
        path="/deposit"
        element={
          <Layout>
            <DepositPage />
          </Layout>
        }
      />
      <Route
        path="/withdraw"
        element={
          <Layout>
            <WithdrawPage />
          </Layout>
        }
      />
      <Route
        path="/transactions"
        element={
          <Layout>
            <TransactionsPage />
          </Layout>
        }
      />
      <Route
        path="/analytics"
        element={
          <Layout>
            <AnalyticsPage />
          </Layout>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <TransactionProvider>
        <AppRoutes />
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'text-sm',
          }} 
        />
      </TransactionProvider>
    </Router>
  );
}

export default App;