import React from "react";
import Title from "./../components/Title/index";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import "./home.css";

function Home() {
  return (
    <div style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <Banner />
      <h1>Catálogo de Livros</h1>
      <h3>Livros disponíveis</h3>
      {/* <Title title=""/> */}
      <SearchBar />
    </div>
  );
}
export default Home;
