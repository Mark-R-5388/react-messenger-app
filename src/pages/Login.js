import React, { useState } from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [data, setData] = useState({
    
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const {  email, password, error, loading } = data;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if ( !password || !email) {
      setData({ ...data, error: 'All fields are required' });
    }
    try {
      const result = signInWithEmailAndPassword(auth,email,password)

      await updateDoc(doc(db,'users', (await result).user.uid), {
        isOnline: true
      })
    
      setData({
        email: '',
        password: '',
        error: null,
        loading: false,
      });
      navigate('/')
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="register_page">
      <h3>Login into your Account</h3>
      <div className="form_container">
        <form className="form_content_container" onSubmit={handleSubmit}>
         

          <div className="input_container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="input_container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="btn_container">
            <button className="btn_register" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </div>
          {error ? <p className="error">{error}</p> : null}
        </form>
      </div>
    </section>
  );
}
