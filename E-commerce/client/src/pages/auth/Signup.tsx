import { FormEvent } from 'react';
import styles from './auth.module.css';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const { handleSignup, loading } = useSignup();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as { email: string, password: string, passwordAgain: string };
    
    handleSignup(values.email, values.password, values.passwordAgain);

    e.currentTarget.reset();
  }

  return (
    <div className={styles.container}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>Signup</h2>
          <span>Create a new account</span>
        </div>
        <div className={styles.inputGroup}>
          <input type="text" id="email" placeholder="" name='email' />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.inputGroup}>
          <input type="password" id="password" placeholder="" name='password' />
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles.inputGroup}>
          <input type="password" id="confirm-password" placeholder="" name='passwordAgain' />
          <label htmlFor="confirm-password">Confirm Password</label>
        </div>
        <button type="submit">
          {
            loading ?
            "Signing up..." :
            "Sign Up"
          }
          
        </button>
      </form>
    </div>
  );
}

export default Signup;