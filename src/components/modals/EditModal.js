import React, { useState } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CModalHeader,
} from "@coreui/react";
import { updateProduct } from "../../helpers/global";
import swal from "@sweetalert/with-react";

const EditModal = ({ visible, id, token, onClick }) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [imageurl, setImageUrl] = useState();

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateProduct(token.tokenUser.access_token, id, name, price, imageurl);
    swal("Good Job", "Product has been updated", "success");
    onClick(!visible);
  };
  return (
    <>
      <CModal visible={visible} onClose={() => onClick(false)}>
        <CModalHeader onClose={() => onClick(false)}>
          <CModalTitle>Edit Product</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {" "}
          <CForm className="border p-5" onSubmit={handleUpdate}>
            <CFormInput
              className="mb-3"
              type="hidden"
              id="id"
              value={id}
              placeholder="Product Name"
            />
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
                Update
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};

export default EditModal;
