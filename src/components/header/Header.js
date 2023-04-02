import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import img1 from "../../assets/img2.png";
import "./Header.css";
import { useLocation } from "react-router-dom";
function Header(prop) {
  const location = useLocation();
  useEffect(() => {}, [location]);
  
  if (location.pathname == "/") {
    return <div></div>;
  } else {
    return (
      <div style={{ width: "100%" }}>
        <h1 className="container-fluid imageContainer">
          Welcome To Lifeline Hospital
        </h1>
      </div>
    );
  }
}

export default Header;
