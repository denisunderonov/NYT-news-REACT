import logo from "./img/logo.svg";
import "./header.css";

export default function Header() {
  return (
    <header>
      {
        <HeaderContainer
          component={
            <>
              <HeaderLogotype />
              <HeaderList
                component={
                  <>
                    <HeaderItem text="My News" />
                  </>
                }
              />
            </>
          }
        />
      }
    </header>
  );
}

function HeaderContainer({ component }) {
  return <nav className="header-container">{component}</nav>;
}

function HeaderLogotype() {
  return <a href="#"><img src={logo} className="header__logo" alt="logo" /></a>;
}

function HeaderList({ component }) {
  return <ul className="header__list">{component}</ul>;
}

function HeaderItem({ text }) {
  return <li className="header-list__item"><a href="#">{text}</a><span className="header-list__item-check">0</span></li>;
}

