import React, { useState, useEffect } from "react";
import cx from "classnames";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import styles from "./Programs.module.scss";
import GenericSideBar from "@/components/GenericSideBar/GenericSideBar";
import FilterAndSearch from "@/components/FilterAndSearch/FilterAndSearch";
import Button from "@/components/Button/Button";
import { ReactComponent as CalendarIcon } from "@/assets/icons/tasks-overview-calendar-icon.svg";
import programsIcon from "@/assets/icons/google-filled-icon.svg";
import { ReactComponent as ClockIcon } from "@/assets/icons/clock-icon.svg";
import subMenuIcon from "@/assets/icons/sub-menu-icon.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/search-icon.svg";
import { ReactComponent as SortIcon } from "@/assets/icons/sort-icon.svg";
import emptySelectionIcon from "@/assets/icons/empty-selection-icon.svg";
import ProgramListItem from "./ProgramListItem/ProgramListItem";
import useIsMobile from "@/hooks/useIsMobile";

function Programs() {
  const navigate = useNavigate();
  const params = useParams();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const isMobile = useIsMobile();
  const [selectedMenuId, setSelectedMenuId] = useState(params.id);
  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    isMobile ? setOpenSideBar(false) : setOpenSideBar(true);
  }, [isMobile]);

  const programsListArray = [
    {
      id: 1,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 2,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 3,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 4,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 5,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 6,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 7,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 8,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 9,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    },
    {
      id: 10,
      title: "Google Africa Scholarship Program",
      date: "Dec 12, 2022",
      time: "6:00pm",
      icon: programsIcon,
      ClockIcon,
      CalendarIcon
    }
  ];

  const getMenuItems = () => {
    let listItems = programsListArray.map((item, index) => {
      return {
        component: <ProgramListItem key={index} data={item} />,
        id: item.id
      };
    });

    const headerComponent = !isMobile && (
      <FilterAndSearch
        closeSideBar={handleCloseSidebar}
        dropdownItems={[
          { name: "All", id: 1 },
          { name: "Completed", id: 2 },
          { name: "In-progress", id: 3 }
        ]}
        searchData={handleSearchInput}
        selectedFilterItem={handleSelectedFilterItem}
        showCloseIcon={false}
        inputPlaceholder='Search for programs...'
        showDropdown={true}
        showFilterToggler={true}
        reversed={true}
      />
    );

    return { listItems, headerComponent };
  };

  const handleSearchInput = (e) => {
    console.log(e.target.value);
  };

  const handleSelectedFilterItem = (item) => {
    console.log(item);
  };

  const handleCloseSidebar = () => {
    setOpenSideBar({ open: false, category: "" });
  };

  const handleSelectedMenuItem = (id) => {
    setSelectedMenuId(id);
    navigate(`program-details/${id}`);
  };

  return (
    <div className={cx(styles.programsContainer, "flexCol")}>
      <section className={cx(styles.heading, "flexRow-space-between")}>
        <div className={cx(styles.titleAndToggler, "flexRow")}>
          <div className={cx(styles.togglerDiv, "flexCol-fully-centered")}>
            <img
              className={cx(styles.toggler)}
              src={subMenuIcon}
              alt='toggler'
              onClick={() => setOpenSideBar(!openSideBar)}
            />
            <small className={cx(styles.togglerText)}>MENU</small>
          </div>
          <h3 className={cx(styles.title)}>Programs</h3>
        </div>
        <div className={cx(styles.searchSortDiv, "flexRow-align-center")}>
          <SearchIcon className={cx(styles.searchIcon)} onClick={() => setShowSearchInput(!showSearchInput)} />
          {showSearchInput && (
            <input className={cx(styles.searchInput)} type='text' placeholder='Search for programs' />
          )}
          <SortIcon className={cx(styles.sortIcon)} />
        </div>
        <Button title='Create New Program' onClick={() => navigate("create-program")} />
      </section>
      <section className={cx(styles.mainBody, "flexRow")}>
        {openSideBar && (
          <div className={cx(styles.sidebarWrapper)}>
            <GenericSideBar
              data={getMenuItems()}
              selectedMenuItem={handleSelectedMenuItem}
              closeGenericSideBar={() => setOpenSideBar(false)}
            />
          </div>
        )}

        <div className={cx(styles.content)}>
          {selectedMenuId ? (
            <Outlet />
          ) : (
            <div className={cx(styles.emptySelectionDiv, "flexCol-fully-centered")}>
              <img src={emptySelectionIcon} alt='empty-selection-icon' />
              <p>No item selected yet </p>
              <p>Select an item from the list to view program details</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Programs;
