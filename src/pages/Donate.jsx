// Donate.jsx
import React, { useState } from 'react';

const presets = [15, 25, 50];

function loadScript(src) {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve(true);
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Donate() {
  const [selected, setSelected] = useState(null); // number or 'custom'
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const rupeesToPaise = (r) => Math.round(parseFloat(r) * 100);

  const handlePay = async () => {
    setMessage('');
    const amountRupees = selected === 'custom' ? custom : selected;
    if (!amountRupees || isNaN(amountRupees) || Number(amountRupees) <= 0) {
      setMessage('Please enter/select a valid amount.');
      return;
    }

    const amountPaise = rupeesToPaise(amountRupees);

    setLoading(true);
    const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!ok) {
      setMessage('Could not load payment SDK. Try again.');
      setLoading(false);
      return;
    }

    try {
      // create order on backend
      const createOrderResp = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountPaise })
      });
      const orderData = await createOrderResp.json();
      if (!createOrderResp.ok) {
        setMessage(orderData.error || 'Could not create order');
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.key, // from backend
        amount: amountPaise.toString(),
        currency: orderData.currency || 'INR',
        name: 'Kalyuga — Donations',
        description: 'Support the project',
        order_id: orderData.orderId,
        handler: async function (response) {
          // response: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
          setLoading(true);
          try {
            const verifyResp = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                // optionally: donor info
                donor_name: '',
                donor_email: ''
              })
            });
            const verifyJSON = await verifyResp.json();
            if (verifyResp.ok) {
              setMessage('Thank you! Your donation was successful.');
              // Optionally clear selection
              setSelected(null);
              setCustom('');
            } else {
              setMessage(verifyJSON.message || 'Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            setMessage('Verification error. Check server logs.');
          }
          setLoading(false);
        },
        prefill: {
          name: '', // optional
          email: '' // optional
        },
        theme: { color: '#7c3aed' } // optional
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response);
        setMessage('Payment failed or was cancelled.');
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setMessage('Payment failed to initialize.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Donate</h2>

      <div>
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => { setSelected(p); setCustom(''); }}
          >
            ₹{p}
          </button>
        ))}

        <button
          onClick={() => { setSelected('custom'); }}
        >
          Custom
        </button>
      </div>

      {selected === 'custom' && (
        <div >
          <input
            type="number"
            min="1"
            step="0.5"
            placeholder="Enter amount in ₹ (e.g., 20)"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            />
        </div>
      )}

      <div>
        <button
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Donate'}
        </button>
        <button
          onClick={() => { setSelected(null); setCustom(''); setMessage(''); }}
        >
          Reset
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
