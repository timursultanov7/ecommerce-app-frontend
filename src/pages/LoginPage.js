import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { LoginModalContext } from "../contexts/LoginModalContext";
import { LoginContext } from "../contexts/LoginContext";
// import logo from "../media/images/Shopy-logo.png";
import logo from "../media/images/Shopy-logo.png";

import "../styles/loginpage.css";
const LoginPage = () => {
  const navigate = useNavigate();

  const [user_email, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user_password, setUserPassword] = useState("");
  const { user, setUser, setIsLoggedIn, isLoggedIn } = useContext(LoginContext);
  const [disabled, setDisabled] = useState(true);

  // const [errEmail, setErrEmail] = useState("");
  // const [errPass, setErrPass] = useState("");

  const [errMsg, setErrMsg] = useState("");
  // const [errState, setErrState] = useState(false);

  // console.log(isLoggedIn);
  // console.log(user);

  // console.log(isLoggedIn);
  // console.log("email:", errEmail, "pass:", errPass);

  const handleLogin = async () => {
    // e.preventDefault();

    // fetch("/api/auth/", {
    // "https://ecommerce-backend-abgb.onrender.com/api/auth/",
    try {
      const res = await fetch(
        "https://ecommercial-app-backend.onrender.com/api/auth/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: user_email,
            user_password: user_password,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      // Having the data, we show stored user and close the modal and set the status to logged in and change the navbar
      // setLoading(true);
      // Storing the user
      setUser(data);

      if (data.errMsg) {
        setErrMsg(data.errMsg);

        setIsLoggedIn(false);
      } else if (data.msgPass) {
        setErrMsg(data.errMsg);

        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setErrMsg("");
        setUserEmail("");
        setUserPassword("");
      }
      navigate("/");
      // Setting user as logged in
    } catch (err) {
      // If the password or email are wrong, we will show an error message and the modal should not close nor set the islogged in to true.
      console.log(err);
      // setErrMsg(err);
    }
  };

  return (
    <div className="login-form-wrapper">
      <header className="mobile-login-header">
        <Link to="/">
          <div>
            <img className="mobile-logo-home" src={logo} alt="" />
          </div>
        </Link>
      </header>
      <form
        onSubmit={(e) => {
          handleLogin();
          e.preventDefault();
        }}
        className="mobile-form-container"
      >
        <input
          className="mobile-input"
          type="email"
          placeholder="Enter email"
          value={user_email}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          className="mobile-input"
          type="password"
          placeholder="Password"
          value={user_password}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button
          disabled={!user_email || !user_password ? true : false}
          className="mobile-loginpage-btn"
        >
          Login
        </button>
        <p>
          Don't have an account?
          <Link to="/Signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

{
  /* <Modal
  onSubmit={(e) => {
    handleLogin();
    e.preventDefault();
  }}
>
  <Modal.Header closeButton>
    <Modal.Title>Sign in</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <p className="err-msg">{errMsg}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={user_email}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={user_password}
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </Form.Group>

      <p>
        Don't have an account?
        <Link to="/Signup">Sign up</Link>
      </p>

      {loading ? <p>Loading..</p> : ""}
      <Button
        className="submit-btn"
        variant="primary"
        type="submit"
        disabled={!user_email || !user_password ? true : false}
      >
        Login
      </Button>
    </Form>
  </Modal.Body>
</Modal>; */
}
