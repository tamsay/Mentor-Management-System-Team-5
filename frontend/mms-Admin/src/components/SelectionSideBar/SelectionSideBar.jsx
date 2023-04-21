import React, { useState, useEffect, useRef } from "react";
import cx from "classnames";
import styles from "./SelectionSideBar.module.scss";
import PropTypes from "prop-types";

const SelectionSideBar = ({ data, selectedMenuItem }) => {
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);

  // const handleClickOutside = (event) => {
  //     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
  //         setOpen(false);
  //     }
  // };

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // useEffect(() => {
  //     if (isMobile && open) {
  //         document.body.style.overflow = "hidden";
  //         document.addEventListener("mousedown", handleClickOutside);
  //     } else {
  //         document.body.style.overflow = "auto";
  //         document.removeEventListener("mousedown", handleClickOutside);
  //     }

  //     return () => {
  //         document.removeEventListener("mousedown", handleClickOutside);
  //     };
  // }, [isMobile, open]);

  const sidebarWidth = isMobile ? "100%" : "300px";

  const handleMenuClick = (itemId) => {
    selectedMenuItem(itemId);
  };

  return (
    <div
      ref={sidebarRef}
      className={cx(styles.selectionSideBarContainer, "flexCol")}
      style={{
        width: sidebarWidth,
        position: isMobile ? "absolute" : "relative",
        transition: "width 0s"
      }}
    >
      <div className={styles.selectionSideBarHeader}>{data?.headerComponent}</div>

      <ul>
        {data.listItems.map((item, index) => (
          <li key={index} onClick={() => handleMenuClick(item.id)}>
            {item?.component}
          </li>
        ))}
      </ul>
    </div>
  );
};

SelectionSideBar.propTypes = {
  data: PropTypes.object,
  selectedMenuItem: PropTypes.func
};

export default SelectionSideBar;
