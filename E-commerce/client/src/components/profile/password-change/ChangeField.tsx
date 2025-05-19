import { useEffect, useState } from 'react';
import styles from './changeField.module.css';
import { useAuthStore } from '../../../store/authStore';

interface IChangeFieldProps {
  fieldName: 'email' | 'password';
  handleChange: (currentValue: string, newValue: string) => void;
  loading: boolean;
}

const ChangeField: React.FC<IChangeFieldProps> = ({ fieldName, handleChange, loading }) => {
  const { user } = useAuthStore();
  const [currentFieldValue, setCurrentFieldValue] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  const handleFieldChange = async (e: React.FormEvent) => {
    e.preventDefault();
    handleChange(currentFieldValue, newFieldValue);
    setNewFieldValue('');
  };

  useEffect(() => {
    if(fieldName === 'email') {
      setCurrentFieldValue(user!.email)
    }
  }, [user!.email]);

  return (
    <div className={styles.formSection}>
      <h3 className={styles.formTitle}>Change {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</h3>
      <form onSubmit={handleFieldChange}>
        <input
          type={fieldName === 'password' ? 'password' : 'text'}
          value={currentFieldValue}
          readOnly={fieldName === 'email'}
          onChange={(e) => setCurrentFieldValue(e.target.value)} 
          placeholder={`Current ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
          className={styles.inputField}
        />
        <input
          type={fieldName === 'password' ? 'password' : 'text'}
          value={newFieldValue}
          onChange={(e) => setNewFieldValue(e.target.value)}
          placeholder={`New ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
          className={styles.inputField}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? 'Updating...' : `Update ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
        </button>
      </form>
    </div>
  );
};

export default ChangeField;
