import { useState } from "react";
import axios from "axios";
import { Formik } from "formik";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const authToken = import.meta.env.VITE_AUTH_TOKEN;
  console.log("Auth token:", authToken);

  // Handle authentication/login
  const handleSignup = async (formValues) => {
    try {
      // Check if passwords match
      if (formValues.password !== formValues.confirmPassword) {
        console.log(
          "Password",
          formValues.password,
          "Confirm",
          formValues.confirmPassword
        );
        alert("Passwords do not match.");
        return;
      }
      const response = axios.post(
        "http://localhost:5000/api/signup",
        {
          email: formValues.email,
          password: formValues.password,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Pass the authentication token from .env
          },
        }
      );
      setLoggedIn(true);
      setEmail("");
      setPassword("");
      console.log(response);
    } catch (error) {
      setLoggedIn(false);
      console.log("Error with REQUEST: ", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1>Sign Up</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleSignup(values);
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit: handleSignup,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSignup} className="login-form">
              <div className="form-group">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword"></label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              </div>
              <button type="submit" disabled={isSubmitting}>
                Sign Up
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signup;
