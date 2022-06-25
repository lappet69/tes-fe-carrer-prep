/* eslint-disable react-hooks/exhaustive-deps */
import { CContainer, CButton } from "@coreui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import CIcon from "@coreui/icons-react";
import { cilAccountLogout } from "@coreui/icons";
import CreateModal from "./modals/CreateModal";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "logout" });
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
        <button
          className="btn px-5 btn-md d-inline mb-3 border"
          onClick={logout}
        >
          <CIcon icon={cilAccountLogout} /> Logout
        </button>
      </div>
      <CreateModal visible={visible} onClick={setVisible} />
    </CContainer>
  );
};

export default Header;
