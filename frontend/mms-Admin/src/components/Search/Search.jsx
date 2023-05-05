import React, { useState } from "react";
import cx from "classnames";
import styles from "./Search.module.scss";
import PropTypes from "prop-types";
import searchIcon from "@/assets/icons/search-icon-green.png";
import closeIcon from "@/assets/icons/close-icon.png";
import deleteIcon from "@/assets/icons/clear-list-reversed.svg";

const Search = ({ onSearchClick, onChange, reversed, inputPlaceholder, expanded }) => {
  const [inputValue, setInputValue] = useState("");
  const [toggle, setToggle] = useState(false);

  console.log(reversed, "reversed");

  const handleInputChange = (value) => {
    setInputValue(value);
    onChange(value);
  };

  const handleToggle = (value) => {
    setToggle(value);
  };

  return (
    <div className={cx(styles.searchContainer, "flexRow")}>
      <div
        className={cx(
          styles.inputDiv,
          "flexRow-align-center",
          toggle ? styles.showInput : styles.hideInput,
          expanded && styles.expanded
        )}
      >
        <img onClick={onSearchClick} src={searchIcon} alt='search-icon' className={cx(styles.icon)} />

        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className={cx(styles.searchInput)}
          type='text'
          placeholder={inputPlaceholder}
        />

        <img
          onClick={() => handleInputChange("")}
          className={cx(styles.clearListIcon)}
          src={deleteIcon}
          alt='delete-icon'
        />
      </div>

      {!expanded ? (
        <div className={cx(styles.togglerGroup, "flexRow-align-center")}>
          {toggle ? (
            <img
              src={closeIcon}
              alt='close-icon'
              className={cx(styles.icon, styles.closeIcon)}
              onClick={() => {
                handleToggle(false);
              }}
            />
          ) : (
            <img
              src={searchIcon}
              alt='search-icon'
              className={cx(styles.icon)}
              onClick={() => {
                handleToggle(true);
              }}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

Search.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  inputPlaceholder: PropTypes.string,
  expanded: PropTypes.bool,
  onSearchClick: PropTypes.func,
  reversed: PropTypes.bool
};

Search.defaultProps = {
  reversed: false
};

export default Search;