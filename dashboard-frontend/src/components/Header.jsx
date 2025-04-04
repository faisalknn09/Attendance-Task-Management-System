import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Header = ({ title, username }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Navigate back to the login page
    navigate('/');
  };

  return (
    <>
      <nav className="navbar font-semibold">
        <div>Welcome {username}</div>
        <h2 className="mt-2.5 font-semibold">{title}</h2>
        <button className="logout text-white" onClick={logout}>
          Logout
        </button>
      </nav>
    </>
  );
};

export default Header;