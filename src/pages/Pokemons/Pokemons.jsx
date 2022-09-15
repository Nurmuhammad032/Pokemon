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
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  console.log(pokemon);
  console.log(next);

    const init = async function() {
     const response = await axios.get(url);
    
     setPokemons(response.data.results);
     setNext(response.data.next);
     setPrev(response.data.previous);
     getPok(response.data.results);
    }

    const getPok = async function(res){
      res?.map(async (item) => {
        const pok = await axios.get(item.url);
        setPokemon(prevState=>{
          prevState=[...prevState ,pok.data]
          prevState.sort((a,b)=>a.id>b.id?1:-1)
          return prevState;
      })
      })
    }

    useEffect(() => {
      init()
    }, [url]);

    const handleNext = () => {
      setUrl(next);
      pokemon.splice(0, 20);
    }

    const handlePrev = () => {
      setUrl(prev);
      pokemon.splice(0, 20);
    }
 
  return (
    <section className="app__pokemons">
      <img src={bg} alt="bgPhoto" className="app__pokemons-bg" />
      <div className="container">
        <Link to={"/"} className="text-dark text-decoration-none">
          <West />
        </Link>
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="my-3">Pokedex</h1>
            <div className="app__pokemons-btn">
            {prev && (
              <button className="me-3 prevBtn" onClick={handlePrev}>
              prev
            </button>
            )}
           {next && (
             <button className="ms-3 nextBtn" onClick={handleNext}>
               next
              </button>
           )}
            </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {pokemon.length ? (
              pokemon.map((pokemon, i) => (
                <div key={i} className="mx-3 my-3">
                  <PokemonCard data={pokemon} />
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
