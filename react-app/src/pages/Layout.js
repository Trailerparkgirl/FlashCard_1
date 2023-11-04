import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-container">
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
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
  )
};

export default Layout;