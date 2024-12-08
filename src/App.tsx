import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { TransactionProvider } from './contexts/TransactionContext';
import { AuthProvider, RequireAuth } from './contexts/AuthContext';

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

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RequireAuth>
      <Layout>{children}</Layout>
    </RequireAuth>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/deposit" replace />} />
      <Route
        path="/deposit"
        element={
          <ProtectedLayout>
            <DepositPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/withdraw"
        element={
          <ProtectedLayout>
            <WithdrawPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedLayout>
            <TransactionsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedLayout>
            <AnalyticsPage />
          </ProtectedLayout>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;