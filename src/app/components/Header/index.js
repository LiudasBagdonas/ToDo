import './index.css';
import { BrowserRouter as Router, NavLink } from "react-router-dom";

function Header() {

    return (
        <header>
            <nav>
                <NavLink to="/">
                    <p>To Do</p>
                </NavLink>

                <NavLink to="/filter">
                    <p>Filter</p>
                </NavLink>

                <NavLink to="/projects">
                    <p>Projects</p>
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;