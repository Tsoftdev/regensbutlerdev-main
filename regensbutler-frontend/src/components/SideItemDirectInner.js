import React from "react";
import { Link } from "react-router-dom";
import "./SideItem.css";
import { useSelector } from "react-redux";

const SideItemDirectInner = (props) => {
  const { title, count } = props.link;
  const pageNumber = props.pageNumber || 1;
  const key_kat = props.key_kat;
  const sortimentType = useSelector((state) => state.sortimentType);
  const { sortimentType: sortiment_type } = sortimentType;
  const key_ukat = props.key_ukat;

  return (
    <>
      <div className="directItemStyleInner">
        <p style={nameStyle}>
          <Link
            to={`/page/${pageNumber}?type=${sortiment_type}&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${title}`}
          >
            {title}
          </Link>
        </p>
        <span className="mr-1">[{count}]</span>
      </div>
    </>
  );
};

const nameStyle = {
  marginLeft: "10px",
  fontWeight: "600",
};

export default SideItemDirectInner;
