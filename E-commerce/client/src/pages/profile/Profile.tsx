import styles from './profile.module.css';
import { useAuthStore } from '../../store/authStore';
import ChangeField from '../../components/profile/password-change/ChangeField';
import { useUser } from '../../hooks/useUser';
import OrderHistory from '../../components/orders/order-history/OrderHistory';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { changePassword, changeEmail, loading } = useUser();
  

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Profile</h2>
      <div className={styles.infoSection}>
        <p className={styles.infoText}>
          <strong>Email:</strong> {user?.email}
        </p>
        {/* Add more user data here if needed */}
      </div>

      <ChangeField fieldName='email' handleChange={changeEmail} loading={loading}/>
      <ChangeField fieldName='password' handleChange={changePassword} loading={loading}/>

      <OrderHistory/>
    </div>
  );
};

export default ProfilePage;
