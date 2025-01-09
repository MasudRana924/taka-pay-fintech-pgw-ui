import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentCheckout from './pages/PaymentCheckout';
import InvalidPayment from './pages/InvalidPayment';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvalidPayment/>} />
        <Route path="/payment/:paymentId" element={<PaymentCheckout/>} />
      </Routes>
    </Router>
  );
}
export default App;
