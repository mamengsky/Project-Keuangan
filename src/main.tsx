import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeSupabase } from './lib/supabase/client';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const root = createRoot(document.getElementById('root')!);

// Show loading state initially
root.render(
  <StrictMode>
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </StrictMode>
);

const init = async () => {
  try {
    console.log('Starting application initialization...');
    
    // Initialize Supabase
    await initializeSupabase();

    console.log('Application initialized successfully');
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Application initialization failed:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred while initializing the application';

    root.render(
      <StrictMode>
        <div className="min-h-screen flex items-center justify-center p-4">
          <ErrorMessage message={errorMessage} />
        </div>
      </StrictMode>
    );
  }
};

init();