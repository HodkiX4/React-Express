// ShippingForm.tsx

import React, { useState } from 'react';
import styles from './shippingForm.module.css';

interface ShippingFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, shippingAddress: string) => void;
  loading: boolean;
}

const ShippingForm = ({ onSubmit, loading }: ShippingFormProps) => {
  const [shippingAddress, setShippingAddress] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(e.target.value);
  };

  return (
    <form className={styles.shippingForm} onSubmit={(e) => onSubmit(e, shippingAddress)}>
      <h2>Shipping Info</h2>
      <input
        name="name"
        placeholder="Full Name"
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={shippingAddress}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
};

export default ShippingForm;
