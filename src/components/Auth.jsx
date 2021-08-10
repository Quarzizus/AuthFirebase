import React, { useState } from "react";
import "firebase/auth";
import { useFirebaseApp, useUser } from "reactfire";
import "../styles/Auth.scss";

const Auth = () => {
  const firebase = useFirebaseApp();
  const user = useUser();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const logOut = async () => {
    await firebase.auth().signOut();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password);
  };
  const logIn = async (e) => {
    e.preventDefault();
    await firebase.auth().signInWithEmailAndPassword(form.email, form.password);
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
