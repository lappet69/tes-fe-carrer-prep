import React, { useState } from "react";
import {
  CContainer,
  CCol,
  CRow,
  CFormInput,
  CButton,
  CForm,
} from "@coreui/react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("https://test-binar.herokuapp.com/auth/login", {
          email,
          password,
        })
        .then((response) => {
          dispatch({ type: "SET_USER", tokenUser: response.data.result });
        });
      history("/dashboard");
    } catch (error) {}
    <Navigate to="/dashboard" />;
  };

  return (
    <CContainer className="App-header">
      <CRow className="align-items-center justify-content-center">
        <CCol md="5">
          <h2 className="text-center m-5">Login</h2>
          <CForm className="border p-5" onSubmit={handleLogin}>
            <CFormInput
              className="mb-3"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <CFormInput
              className="mb-3"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />

            <CButton type="submit" className="col-md-12">
              Login
            </CButton>
          </CForm>
          <p className="lead text-center mt-3">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Login;
