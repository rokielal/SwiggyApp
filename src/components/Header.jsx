import { HEADER_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
  //   const [btnName, setBtnName] = useState(true);
  const [btnName, setBtnName] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={HEADER_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact</li>
          <li>Cart</li>
          {/* <button className="btn-name" onClick={() => setBtnName(!btnName)}>
            {btnName ? "Login" : "Logout"}
          </button> */}

          <button
            className="btn-name"
            onClick={() =>
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
            }
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
