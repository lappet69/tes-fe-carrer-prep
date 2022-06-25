import { CContainer } from "@coreui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "@sweetalert/with-react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CForm,
} from "@coreui/react";
import axios from "axios";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [imageurl, setImageUrl] = useState();
  const token = useSelector((state) => state.tokenUser);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "logout" });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://test-binar.herokuapp.com/v1/products/",
          { name, price, imageurl },
          {
            headers: {
              Authorization: `Bearer ${token.tokenUser.access_token}`,
            },
          }
        )
        .then(() => swal("Good job!", "Product added!", "success"));
    } catch (error) {
      console.log(error);
    }
    setVisible(!visible);
  };

  return (
    <CContainer fluid className="border px-5">
      <div className="d-flex justify-content-between mt-3 px-3">
        <div className="d-flex px-3">
          <h3 className="px-5">Product List</h3>

          <CButton
            className="btn btn-secondary btn-md d-inline mb-3"
            onClick={() => setVisible(!visible)}
          >
            Create New
          </CButton>
        </div>
        <button className="btn px-5" onClick={logout}>
          Logout
        </button>
      </div>
      <>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Create New</CModalTitle>
          </CModalHeader>

          <CModalBody>
            {" "}
            <CForm className="border p-5" onSubmit={handleCreate}>
              <CFormInput
                className="mb-3"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
              <CFormInput
                className="mb-3"
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (Dollar USD)"
              />
              <CFormInput
                className="mb-3"
                type="text"
                id="imageurl"
                value={imageurl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image url"
              />

              <CModalFooter>
                <CButton color="" onClick={() => setVisible(false)}>
                  Back
                </CButton>

                <CButton color="secondary" type="submit">
                  Create
                </CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      </>
    </CContainer>
  );
};

export default Navbar;
