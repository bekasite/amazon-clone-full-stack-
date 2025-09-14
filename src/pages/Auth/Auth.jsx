import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import classes from './auth.module.css';
import { auth } from '../../utility/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { ClipLoader } from 'react-spinners';
import { Type } from '../../utility/action.type';
import { DataContext } from '../../components/DataProvider/DataProvider';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  // Destructure the context properly
  const [{ user }, dispatch] = useContext(DataContext);

  const navStateData = useLocation();
  console.log(navStateData);
  // console.log(user);
  const navigate = useNavigate();

  const authHandler = async e => {
    e.preventDefault();
    setError(''); // Clear previous errors
    const action = e.target.name;

    if (action === 'signin') {
      setLoading({ ...loading, signIn: true });
    } else {
      setLoading({ ...loading, signUp: true });
    }

    try {
      const authFunction =
        action === 'signin'
          ? signInWithEmailAndPassword
          : createUserWithEmailAndPassword;

      const userCredential = await authFunction(auth, email, password);

      // Dispatch the user data to your context
      if (userCredential && userCredential.user) {
        dispatch({
          type: Type.SET_USER,
          user: userCredential.user,
        });

        // Redirect to home page on successful auth

        setSuccess('Logged In Successfully');
        setTimeout(() => {
          navigate(navStateData?.state?.redirect || '/');
        }, 2000);
      }
    } catch (err) {
      if (err.message == 'Firebase: Error (auth/invalid-credential).') {
        setError('Check Email or Password again');
      } else if (
        err.message == 'Firebase: Error (auth/network-request-failed).'
      ) {
        setError('Check your internet connection');
      } else if (
        err.message == 'Firebase: Error (auth/email-already-in-use).'
      ) {
        setError('Email is Already in use');
      } else {
        setError(err.message);
      }

      // You might also want to dispatch an error action
      // dispatch({ type: Type.SET_ERROR, error: err.message });
    } finally {
      // Ensure loading state is always reset
      setLoading({ signIn: false, signUp: false });
    }
  };

  return (
    <section className={classes.main__container}>
      <Link to={'/'}>
        <img src="/image.png" alt="Amazon Clone Logo" />
      </Link>
      <section className={classes.container}>
        <form>
          <h1>Sign in</h1>
          {navStateData?.state?.msg && (
            <small
              style={{
                width: '100%',
                padding: '5px',
                textAlign: 'center',
                color: 'red',
                fontWeight: 'bold',
              }}
            >
              {navStateData.state.msg}
            </small>
          )}
          <br />
          {error && <h6 className={classes.error_msg}>{error}</h6>}
          {success && <h6 className={classes.success_msg}>{success}</h6>}
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className={classes.orange}
            onClick={authHandler}
            name="signin"
            disabled={loading.signIn}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : 'Sign In'}
          </button>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Interest-Based Ads Notice.
          </p>
        </form>
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          disabled={loading.signUp}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            'Create your Amazon Account'
          )}
        </button>
      </section>
    </section>
  );
}
