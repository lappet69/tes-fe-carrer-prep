import React, { useState } from "react";
import {
  CContainer,
  CCol,
  CRow,
  CFormInput,
  CButton,
  CForm,
} from "@coreui/react";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("https://test-binar.herokuapp.com/auth/signup", {
          name,
          email,
          password,
        })
        .then((response) => {
          swal("Good job!", "Your account has been created", "success");
          navigate("/");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CContainer className="App-header">
      <CRow className="align-items-center justify-content-center">
        <CCol md="5">
          <h2 className="text-center m-5">Register</h2>
          <CForm className="border p-5" onSubmit={handleRegister}>
            <CFormInput
              className="mb-3"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
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
              Register
            </CButton>
          </CForm>
          <p className="lead  text-center mt-3">
            <small>
              {" "}
              Already have an account?
              <a href="/">Login</a>
            </small>
          </p>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Register;
