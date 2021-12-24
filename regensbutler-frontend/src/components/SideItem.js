import React from "react";
import { Link } from "react-router-dom";
import "./SideItem.css";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import SideItemDirect from "./SideItemDirect";
import { useSelector } from "react-redux";

const SideItem = (props) => {
  const { name, links, open } = props.kategorien;
  const [isOpen, setIsOpen] = React.useState(open);
  const pageNumber = props.pageNumber || 1;
  const sortimentType = useSelector((state) => state.sortimentType);
  const { sortimentType: sortiment_type } = sortimentType;
  const openSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`${isOpen ? "sideItemStyle2" : "sideItemStyle"}`}
        onClick={() => openSideNav()}
      >
        <p style={nameStyle}>
          <Link to={`/page/${pageNumber}?type=${sortiment_type}&key_kat=${name}`}>{name}</Link>
        </p>
        {isOpen ? (
          <BsFillCaretDownFill className="BsFillCaretOpen" />
        ) : (
          <BsFillCaretRightFill className="BsFillCaretClosed" />
        )}
      </div>
      {isOpen &&
        links.map((link, index) => {
          return (
            <SideItemDirect
              pageNumber={props.pageNumber}
              key={index}
              link={link}
              key_kat={name}
            />
          );
        })}
    </>
  );
};

const nameStyle = {
  marginLeft: "10px",
  fontWeight: "600",
};

export default SideItem;
