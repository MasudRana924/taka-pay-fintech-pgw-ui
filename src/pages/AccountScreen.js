import React, { useState } from 'react';

const AccountScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="w-full h-[60px] mx-auto relative">
        <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-20 h-20">
            <circle cx="50" cy="50" r="40" fill="#4CAF50" stroke="#4CAF50" strokeWidth="5" />
            <text x="50" y="50" fontFamily="Arial, sans-serif" fontSize="20" textAnchor="middle" fill="white" dy="-5">
              ৳
            </text>
            <text x="50" y="50" fontFamily="Arial, sans-serif" fontSize="16" textAnchor="middle" fill="white" dy="20">
              TakaPay
            </text>
          </svg>
        </div>
      </div>

      {/* Merchant Info */}
      <div className="flex items-center justify-between mt-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 mx-6 w-11/12 mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="150" height="150">
              <circle cx="12" cy="12" r="11" fill="#006a4e" />
              <circle cx="9" cy="12" r="4" fill="#f42a41" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">Sample Merchant</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl text-gray-900">ট 1000.00</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="w-full h-[230px] px-6 py-8 flex flex-col items-center justify-center mt-4" style={{ backgroundColor: "#ecf0f1" }}>
        <label htmlFor="account-input" className="text-gray-900 text-md mb-4 text-center">
          Enter Wallet Number
        </label>
        <input
          type="text"
          id="account-input"
          className="block w-full px-4 py-4 text-xl border rounded-lg text-center bg-white"
          placeholder="01XXXXXXXXX"
          maxLength="11"
        />
        <div className="mt-4">
          <p className="text-sm text-gray-900 text-center">
            By confirm you agree to terms and conditions
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-4 w-11/12 mx-auto">
        <button
          className="w-11/12 mx-auto mt-6 py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[0.99] flex items-center justify-center text-white hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          id="account-cancel-btn"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="w-11/12 mx-auto mt-6 py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[0.99] flex items-center justify-center text-white hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          id="account-confirm-btn"
          disabled={isLoading}
          onClick={() => setIsLoading(true)}
        >
          {isLoading ? <span>Loading...</span> : <span>Confirm</span>}
        </button>
      </div>

      <div className="m-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">Secured by TakaPay © 2025</p>
      </div>
    </div>
  );
};

export default AccountScreen;
