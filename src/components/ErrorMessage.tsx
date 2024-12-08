import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  showRetry?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, showRetry = true }) => {
  const formattedMessage = message.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className="max-w-2xl w-full mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-red-800">
            Database Setup Required
          </h3>
          <div className="mt-2 text-sm text-red-700 whitespace-pre-line">
            {formattedMessage}
          </div>
          {showRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center space-x-2 text-sm font-medium text-red-600 hover:text-red-500"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retry Connection</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;