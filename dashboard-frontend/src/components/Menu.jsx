import { NavLink } from "react-router-dom";
import BBI_logo from "../assets/BBI logo.png";

// eslint-disable-next-line react/prop-types
const Menu = ({ setTitle }) => {
  return (
    <div>
      <nav className="side bg-blue-600 fixed text-white">
        <img src={BBI_logo} alt="BBI Logo" className="logo" />
        <NavLink
          to="./"
          className={({ isActive }) =>
            isActive ? "button text-black" : "button text-white"
          }
          onClick={() => setTitle("DashBoard")}
        >
          Home
        </NavLink>
        <NavLink
          to="./Info"
          className={({ isActive }) =>
            isActive ? "button text-black" : "button text-white"
          }
          onClick={() => setTitle("Info")}
        >
          Info
        </NavLink>
        <NavLink
          to="./Report"
          className={({ isActive }) =>
            isActive ? "button text-black" : "button text-white"
          }
          onClick={() => setTitle("Report")}
        >
          Report
        </NavLink>
      </nav>
    </div>
  );
};

export default Menu;