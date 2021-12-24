import React from "react";
import { Link } from "react-router-dom";
import "./SideItem.css";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import SideItemDirectInner from "./SideItemDirectInner";
import { useSelector } from "react-redux";

const SideItemDirect = (props) => {
  const { title, sublinks, open } = props.link;
  const [isOpen, setIsOpen] = React.useState(open);
  const pageNumber = props.pageNumber || 1;
  const sortimentType = useSelector((state) => state.sortimentType);
  const { sortimentType: sortiment_type } = sortimentType;
  const key_kat = props.key_kat;

  const openSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`${isOpen ? "directItemStyle2" : "directItemStyle"}`}
        onClick={() => openSideNav()}
      >
        <p style={nameStyle}>
          <Link to={`/page/${pageNumber}?type=${sortiment_type}&key_kat=${key_kat}&key_ukat=${title}`}>
            {title}
          </Link>
        </p>
        {isOpen ? (
          <BsFillCaretDownFill className="BsFillCaretOpen2" />
        ) : (
          <BsFillCaretRightFill className="BsFillCaretClosed" />
        )}
      </div>
      {isOpen &&
        sublinks.map((link, index) => {
          return (
            <SideItemDirectInner
              key={index}
              sortiment_type={sortiment_type}
              link={link}
              pageNumber={pageNumber}
              key_kat={key_kat}
              key_ukat={title}
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

export default SideItemDirect;
