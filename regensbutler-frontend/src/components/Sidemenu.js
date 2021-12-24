import React from "react";

import SideItem from "./SideItem";

const Sidemenu = ({ kategorien, pageNumber }) => {
  return (
    <div style={sideNavStyle}>
      {kategorien.map((kategorie, index) => {
        return <SideItem key={index} kategorien={kategorie} />;
      })}
    </div>
  );
};

const sideNavStyle = {
  flexShrink: 0,
  width: "210px",
  position: "sticky",
  webkit: "-webkit-sticky",
  top: "85px",
  height: "600px",
  background: "#f7f7f7",
  overflowY: "scroll",
  textAlign: "left",
  marginRight: "15px",
};

export default Sidemenu;
