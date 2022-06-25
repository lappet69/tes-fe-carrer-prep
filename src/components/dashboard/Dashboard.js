/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardImage,
  CCardText,
  CCardTitle,
  CButton,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { cilPen, cilTrash } from "@coreui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header";
import { useSelector } from "react-redux";
import swal from "@sweetalert/with-react";
import { GetData } from "../../helpers/global";
import EditModal from "../modals/EditModal";

const Dashboard = () => {
  const [items, setItems] = useState();

  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState();

  const token = useSelector((state) => state.tokenUser);

  // delete data
  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target[0].value;

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this prodcut!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          axios
            .delete(`https://test-binar.herokuapp.com/v1/products/${id}`, {
              headers: {
                Authorization: `Bearer ${token.tokenUser.access_token}`,
                ContentType: "application/json",
              },
            })
            .then(async (data) => {
              await swal("Product has been deleted!", {
                icon: "success",
              });
            });
        } catch (error) {
          console.error("errore");
        }
      }
    });
  };

  useEffect(() => {
    GetData(token.tokenUser.access_token).then((data) => setItems(data));
  }, []);

  return (
    <>
      <Header />
      <CContainer>
        <CRow>
          {items
            ? items.map((item, index) => (
                <CCol md="4" className="my-5 p-4" key={item.id}>
                  <CCard className="">
                    <CButton
                      type="button"
                      color=""
                      onClick={(e) => {
                        setToggle(!toggle);
                        setId(index);
                      }}
                    >
                      <CCardImage src={item.imageurl} alt={item.name} />
                    </CButton>
                    <div style={{ position: "absolute", top: "0", right: 0 }}>
                      <Link to={``}>
                        <CButton
                          color=""
                          onClick={(e) => {
                            setVisible(!visible);
                            setId(item.id);
                          }}
                          className="btn btn-sm "
                        >
                          <CIcon icon={cilPen} />
                        </CButton>
                      </Link>
                      <CForm onSubmit={handleDelete} className="d-inline">
                        <CFormInput type="hidden" name="id" value={item.id} />
                        <CButton
                          color=""
                          className="btn btn-sm  d-inline"
                          type="submit"
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CForm>
                    </div>
                    <CCardTitle>{item.name}</CCardTitle>
                    <CCardText>$ {item.price}</CCardText>
                  </CCard>
                </CCol>
              ))
            : " No data"}
        </CRow>
      </CContainer>

      <>
        <CModal visible={toggle} onClose={() => setToggle(false)}>
          <CModalHeader onClose={() => setToggle(false)}></CModalHeader>

          <CModalBody>
            {" "}
            <CCol className="my-5 p-4">
              <CCard className="">
                <CCardImage src={toggle ? items[id].imageurl : ""} alt={id} />
                <div style={{ position: "absolute", top: "0", right: 0 }}></div>
                <CCardTitle>{toggle ? items[id].name : ""}</CCardTitle>
                <CCardText>$ {toggle ? items[id].price : ""}</CCardText>
              </CCard>
            </CCol>
          </CModalBody>
        </CModal>
      </>
      <EditModal visible={visible} onClick={setVisible} />
    </>
  );
};

export default Dashboard;
