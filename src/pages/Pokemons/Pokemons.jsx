import "./Pokemons.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { West } from "@mui/icons-material";
import bg from "../../assets/bg-img.png";

const Pokemons = () => {
  const [pokemonsData, setPokemonsData] = useState({});

  useEffect(() => {
    const init = async () => {
      let ops = [];
      for (let i = 1; i < 20; i++) {
        let op = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        ops.push(op);
      }

      let res = await axios.all(ops);
      setPokemonsData(res);
    };
    init();
  }, []);

  return (
    <section className="app__pokemons">
      <img src={bg} alt="bgPhoto" className="app__pokemons-bg" />
      <div className="container">
        <Link to={"/"} className="text-dark text-decoration-none">
          <West />
        </Link>
        <h1 className="my-3">Pokedex</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {pokemonsData.length ? (
            pokemonsData.map((pokemon, i) => (
              <div key={i} className="mx-3 my-3">
                <PokemonCard data={pokemon.data} />
              </div>
            ))
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </section>
  );
};



export default Pokemons;
