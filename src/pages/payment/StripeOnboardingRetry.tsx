import React from 'react';
import { useNavigate } from 'react-router-dom';

const StripeOnboardingRetry = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>⚠️ Nu ai finalizat onboarding-ul Stripe</h2>
      <p>Fără cont activ, nu poți încasa bani din închirieri.</p>
      <button onClick={() => navigate('/profile')} className="btn btn-warning mt-4">
        Reîncearcă mai târziu
      </button>
    </div>
  );
};

export default StripeOnboardingRetry;
