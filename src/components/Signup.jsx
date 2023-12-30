import { useState } from "react";
import axios from "axios";
import { Formik } from "formik";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Handle authentication/login
  const handleSignup = async (formValues) => {
    try {
      const response = axios.post("http://localhost:5000/api/signup", {
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
            <form onSubmit={handleSignup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
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