import React, { useState } from "react";
import firebase from "firebase";
import { useUser, useAuth } from "reactfire";
import "firebase/auth";

import "../styles/Auth.scss";

const Auth = () => {
  const user = useUser();
  const auth = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const logOut = async () => {
    await auth.signOut();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.createUserWithEmailAndPassword(form.email, form.password);
  };
  const logIn = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(form.email, form.password);
  };
  const handleGoogleSubmit = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  if (!user.data) {
    return (
      <form>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button onClick={logIn}>Iniciar sección</button>
        <button onClick={handleSubmit}>Registrarse</button>
        <button onClick={handleGoogleSubmit}>Google</button>
      </form>
    );
  } else {
    return (
      <>
        <h1>{user.data.email}</h1>
        <button onClick={logOut}>Cerrar Sección</button>
      </>
    );
  }
};

export default Auth;
