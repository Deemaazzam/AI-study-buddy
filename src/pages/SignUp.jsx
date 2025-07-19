import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const SignUp = () => {
  const [animationClass, setAnimationClass] = useState("");
  const [activeFormClass, setActiveFormClass] = useState("sign-in-active");

  const handleSignUpClick = () => {
    setAnimationClass("");
    setTimeout(() => {
      setAnimationClass("animate-signUp");
      setActiveFormClass("sign-up-active");
    }, 10);
  };

  const handleSignInClick = () => {
    setAnimationClass("");
    setTimeout(() => {
      setAnimationClass("animate-signIn");
      setActiveFormClass("sign-in-active");
    }, 10);
  };

  useEffect(() => {
    if (animationClass) {
      const timeout = setTimeout(() => {
        setAnimationClass("");
      }, 1600);
      return () => clearTimeout(timeout);
    }
  }, [animationClass]);

  // Validation schema
  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too short").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="main-wrapper">
      <div className={`wrapper-signup ${animationClass} ${activeFormClass}`}>
        {/* Login Form */}
        <div className="form-wrapper sign-in">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log("Login submitted", values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <h2>Login</h2>
                <div className="input-group">
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                  />
                  <label>Email</label>
                  {errors.email && touched.email && (
                    <div className="error">{errors.email}</div>
                  )}
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    required
                  />
                  <label>Password</label>
                  {errors.password && touched.password && (
                    <div className="error">{errors.password}</div>
                  )}
                </div>
                <div className="forgot-password">
                  <a href="#">Forgot Password?</a>
                </div>
                <button type="submit" className="btn-log">
                  Login
                </button>
                <div className="sign-link">
                  <p>
                    Don't have an account?{" "}
                    <button type="button" onClick={handleSignUpClick}>
                      Sign Up
                    </button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Sign Up Form */}
        <div className="form-wrapper sign-up">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
              console.log("SignUp submitted", values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <h2>Sign Up</h2>
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                  />
                  <label>Username</label>
                  {errors.name && touched.name && (
                    <div className="error">{errors.name}</div>
                  )}
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                  />
                  <label>Email</label>
                  {errors.email && touched.email && (
                    <div className="error">{errors.email}</div>
                  )}
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    required
                  />
                  <label>Password</label>
                  {errors.password && touched.password && (
                    <div className="error">{errors.password}</div>
                  )}
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    required
                  />
                  <label>Confirm Password</label>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="error">{errors.confirmPassword}</div>
                  )}
                </div>
                <button type="submit" className="btn-log">
                  Sign Up
                </button>
                <div className="sign-link">
                  <p>
                    Already have an account?{" "}
                    <button type="button" onClick={handleSignInClick}>
                      Login
                    </button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
