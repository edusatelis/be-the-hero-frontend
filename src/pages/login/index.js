import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";
import api from "../../services/api";
import HeroesImg from "../../assets/heroes.png";
import LogoImg from "../../assets/logo.svg";

export default function Login() {
  const [id, setId] = useState("");

  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("profile");
    } catch (error) {
      alert("Falha no login, por favor tente novamente");
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={LogoImg} alt="Be the Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="BackLink" to="/register">
            <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={HeroesImg} alt="Heroes" />
    </div>
  );
}
