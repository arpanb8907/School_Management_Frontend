import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-500 p-4 text-white">
    <ul className="flex space-x-4">
      <li>
        <NavLink
          to="/"
          className="cursor-pointer hover:underline"
          activeClassName="font-bold underline"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className="cursor-pointer hover:underline"
          activeClassName="font-bold underline"
        >
          Dashboard
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to="/login"
          className="cursor-pointer hover:underline"
          activeClassName="font-bold underline"
        >
          Login
        </NavLink>
      </li> */}
    </ul>
  </nav>
);

export default Navbar;
