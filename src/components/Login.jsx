import { useState } from "react";
import axios from "axios";
import { Formik } from "formik";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const authToken = import.meta.env.VITE_AUTH_TOKEN;
  console.log("Auth token:", authToken);

  // Handle authentication/login
  const handleLogin = async (formValues) => {
    try {
      const response = axios.post("http://localhost:5000/api/login", {
        email: formValues.email,
        password: formValues.password,
      });
      setLoggedIn(true);
      setEmail("");
      setPassword("");
      console.log(response);
    } catch (error) {
      setLoggedIn(false);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="login-container">
          <h1>Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = " Email Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleLogin(values);
                // Write code to handle login
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
              handleSubmit: handleLogin,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <div className="error">{errors.email}</div>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
