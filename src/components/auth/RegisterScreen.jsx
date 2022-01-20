import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
/* 
 {
   name:'test',
   email:'test@gmail.com',
   password:'test123',
   password2:'test123'

 }
*/
export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "test",
    email: "test@gmail.com",
    password: "test123",
    password2: "test123",
  });

  const { name, email, password, password2 } = formValues;
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2) {
      dispatch(setError("Las contraseñas no coinciden"));
      return false;
    } else if (password.length < 6) {
      dispatch(setError("Password should have at least 6 characters!"));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name, email, password, password2);
    if (isFormValid()) {
      console.log("formulario correcto");
    } else console.log("formulario incorrecto");
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        {msgError !== null && (
          <div className="auth__alert-error">{msgError}</div>
        )}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          required={true}
          value={name}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
          required={true}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
          required={true}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
          required={true}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
