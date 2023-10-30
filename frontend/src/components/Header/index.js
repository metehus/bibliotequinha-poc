import "./header.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <Link to="/" className="header-options-container">
      <img
        className="logo-icon"
        src={process.env.PUBLIC_URL + "/logo-no-background.png"}
      ></img>
    </Link>
  );
}
