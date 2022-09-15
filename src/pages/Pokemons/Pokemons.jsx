import "./Pokemons.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { West } from "@mui/icons-material";
import bg from "../../assets/bg-img.png";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  console.log(pokemon);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
      .then((res) => setPokemons(res.data))
      .catch((err) => console.log(err));
  }, []);

  let pokemonsData = [];
  useEffect(() => {
    for (let i = 0; i < pokemons?.results.length; i++) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemons?.results[i].name}`)
        .then((res) => setPokemon(res))
        .catch((err) => console.log(err));
    }
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
            <>
              {pokemonsData.map((pokemon, i) => (
                <div key={i} className="mx-3 my-3">
                  <PokemonCard data={pokemon?.data} />
                </div>
              ))}
              <div>
                <button onClick={() => setPokemons((prev) => prev + 20)}>
                  nex
                </button>
              </div>
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </section>
  );
};

export default Pokemons;
