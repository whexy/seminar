import { useRouter } from "next/router";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">SysSecSem</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavItem url="/" name="Home" />
            <NavItem url="/link" name="Link" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ name, url }) => {
  const router = useRouter();
  const isActive = router.asPath === url;

  return (
    <li className="nav-item">
      <Link href={url}>
        <a className={`nav-link ${isActive ? "active" : ""}`}>{name}</a>
      </Link>
    </li>
  );
};

export default Nav;
