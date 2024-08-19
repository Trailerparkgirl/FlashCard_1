import { Outlet, Link } from "react-router-dom";
import logo from "../assets/Note.png";

const Layout = () => {
  return (
    <div>
      <div>
      <Link to="/">
        <img src={logo} alt="Logo" style={{ width: '50px',  }} className="icon"/>
        Home
      </Link>
      </div>

      <div className="app-container">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/AddWord">Add a word</Link>
            </li>
            <li>
              <Link to="/WordList">Word list</Link>
            </li>
          </ul>
        </nav>
        <div className="context">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
