import React, { useEffect, useState } from 'react';

const InvalidPayment = () => {
    const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup timer when the component unmounts
    return () => clearInterval(timer);
  }, []);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
          {/* Header with Logo */}
          <div className="w-full h-[60px] mx-auto relative mb-8">
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-20 h-20"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="#ef233c"
                  stroke="#ef233c"
                  strokeWidth="5"
                />
                <text
                  x="50"
                  y="45"
                  fontFamily="Arial, sans-serif"
                  fontSize="20"
                  textAnchor="middle"
                  fill="white"
                >
                  ৳
                </text>
                <text
                  x="50"
                  y="70"
                  fontFamily="Arial, sans-serif"
                  fontSize="16"
                  textAnchor="middle"
                  fill="white"
                >
                  TakaPay
                </text>
              </svg>
            </div>
          </div>

          {/* Updated Input Section */}
          <div className="h-[460px] flex flex-col items-center justify-center mt-4  p-4  w-full" style={{backgroundColor:'#ef233c'}}>
            <p className="text-white text-2xl font-medium">
              Invalid page request
            </p>
            <p className="text-white text-sm font-medium mt-4 border-b border-white ">
              Please try with a valid payment link
            </p>
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

export default InvalidPayment;