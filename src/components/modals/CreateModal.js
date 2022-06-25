import React, { useState } from "react";
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
import { saveProduct } from "../../helpers/global";
import swal from "@sweetalert/with-react";
import { useSelector } from "react-redux";

const CreateModal = ({ visible, onClick }) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [imageurl, setImageUrl] = useState();
  const token = useSelector((state) => state.tokenUser);

  // create
  const handleCreate = (e) => {
    e.preventDefault();
    saveProduct(token.tokenUser.access_token, name, price, imageurl);
    swal("Good Job", "Product has been created", "success");
    onClick(!visible);
  };

  return (
    <>
      <CModal visible={visible} onClose={() => onClick(false)}>
        <CModalHeader onClose={() => onClick(false)}>
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
              <CButton color="" onClick={() => onClick(false)}>
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
  );
};

export default CreateModal;
