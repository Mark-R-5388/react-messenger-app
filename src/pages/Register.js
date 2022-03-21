import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const { name, email, password, error, loading } = data;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !password || !email) {
      setData({ ...data, error: 'All fields are required' });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: '',
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
      <h3>Register an Account</h3>
      <div className="form_container">
        <form className="form_content_container" onSubmit={handleSubmit}>
          <div className="input_container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

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
            <button className="btn_register" disabled={loading}>{loading ? "Registering..." : 'Register'}</button>
          </div>
          {error ? <p className="error">{error}</p> : null}
        </form>
      </div>
    </section>
  );
}
