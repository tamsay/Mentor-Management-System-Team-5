import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalContainer from "../ModalContainer/ModalContainer";
import cx from "classnames";
import styles from "./SuccessNotification.module.scss";

import headerImage from "@/assets/images/reset-password-success.png";
import Button from "@/components/Button/Button";

import { hideModal } from "@/redux/Modal/ModalSlice";
import { useNavigate } from "react-router";

const SuccessNotification = ({ show, size, modalName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalData = useSelector((state) => state.modal.modalData);

  console.log(modalData, "modal data");

  const handleClick = () => {
    dispatch(hideModal({ name: "successNotification" }));
    // navigate("/login");
  };

  return (
    <ModalContainer show={show} size={size} modalName={modalName}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
        <div className={cx(styles.modalHeader, "flexCol")}>
          <h6 className={cx(styles.headerTitle)}>{modalData}</h6>
          <img className={cx(styles.headerImage)} src={headerImage} alt='header-image' />
        </div>

        <div className={cx(styles.modalBody, "flexCol")}>
          <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>
            <Button onClick={handleClick} title='Done' />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default SuccessNotification;