import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentCheckout from './pages/PaymentCheckout';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment/:paymentId" element={<PaymentCheckout/>} />
      </Routes>
    </Router>
  );
}
export default App;
