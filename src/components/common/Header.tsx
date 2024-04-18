import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between">
      <Link to="/">HOME</Link>
      <nav>
        <ul className="flex">
          <li>
            <NavLink to="/article">Article</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
