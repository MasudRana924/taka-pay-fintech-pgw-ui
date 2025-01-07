import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes,useParams ,useLocation  } from 'react-router-dom';
import PaymentCheckout from './pages/PaymentCheckout';
const PaymentPage = ({ match }) => {
  return (
      <div>
          <h2>Payment Details</h2>
         
      </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Define a dynamic route for the checkout */}
        <Route path="/payment/:paymentId" element={<PaymentCheckout/>} />
      </Routes>
    </Router>
  );
}

export default App;
