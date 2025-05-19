import { FormEvent } from 'react';
import styles from './auth.module.css';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { handleLogin, loading } = useLogin();
  
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as { email: string, password: string };
    
    handleLogin(values.email, values.password, navigate);
  }
  return (
    <div className={styles.container}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>Login</h2>
          <span>Log in to your account</span>
        </div>
        <div className={styles.inputGroup}>
          <input type="text" id="email" placeholder="" name='email' />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.inputGroup}>
          <input type="password" id="password" placeholder="" name='password' />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">
          {
            loading ?
            "Logging in..." :
            "Log In"
          }
          
        </button>
      </form>
    </div>
  )
}

export default Login;
