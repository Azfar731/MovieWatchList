import "./Header.css";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
type Params = {
  title: string;
  link: string;
  linkText: string;
};

export default function Header({ title, link, linkText }: Params) {
  return (
    <div className="header-container">
      <header>
        <div className="header-content">
          <h1 className="header-title">{title}</h1>
          <Link to={link} className="header-link">
            {linkText}
          </Link>
        </div>
      </header>
    </div>
  );
}
