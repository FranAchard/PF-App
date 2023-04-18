import "./navbar.scss";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import logo from "/assets/img/logo.png";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const handleProductsClick = () => {
    const productsRef = document.querySelector(".products");
    productsRef.scrollIntoView();
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "¿Estás seguro/a de que deseas cerrar sesión?"
    );
    if (confirmLogout) {
      dispatch(setToken(false));
      alert("Has cerrado sesión exitosamente");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar__links">
        <Link to="/">Inicio</Link>
        <Link to="/home" onClick={handleProductsClick}>
          Productos
        </Link>
        {token ? (
          <div className="token_true">
            <Link to="/profile">Perfil</Link>
            <Link onClick={handleLogout} to="/home" className="desconectarse">
              Cerrar sesión
            </Link>
          </div>
        ) : (
          <Link to="/login" className="ingresar">
            Iniciar sesión
          </Link>
        )}
        <DarkMode />
      </div>
    </div>
  );
};

export default Navbar;
