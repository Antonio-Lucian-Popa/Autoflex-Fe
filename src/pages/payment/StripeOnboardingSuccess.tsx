import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StripeOnboardingSuccess = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'incomplete'>('loading');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data } = await axios.get(`/api/payments/owner-status/${ownerId}`);
        if (data.chargesEnabled && data.payoutsEnabled) {
          setStatus('success');
        } else {
          setStatus('incomplete');
        }
      } catch (err) {
        console.error(err);
        setStatus('incomplete');
      }
    };

    if (ownerId) checkStatus();
  }, [ownerId]);

  if (status === 'loading') return <p>Se verifică contul Stripe...</p>;

  return (
    <div className="container">
      {status === 'success' ? (
        <>
          <h2>✅ Cont Stripe activat cu succes</h2>
          <p>Poți acum primi plăți pentru închirieri.</p>
        </>
      ) : (
        <>
          <h2>⚠️ Cont Stripe incomplet</h2>
          <p>Te rugăm să finalizezi procesul de onboarding pentru a putea încasa bani.</p>
        </>
      )}
      <button onClick={() => navigate('/profile')} className="btn btn-primary mt-4">
        Înapoi la profil
      </button>
    </div>
  );
};

export default StripeOnboardingSuccess;
