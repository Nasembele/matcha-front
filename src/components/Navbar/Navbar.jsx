import style from './Navbar.module.css';
import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav className={style.nav}>
        <div className={style.item}>
            <NavLink to="/login" activeClassName={style.activeLink}>Войти</NavLink>
        </div>
        <div className={style.item}>
            <NavLink to="/registration" activeClassName={style.activeLink}>Зарегистрироваться</NavLink>
        </div>
    </nav>
}

export default Navbar;